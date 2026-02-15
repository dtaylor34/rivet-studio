import React from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useTheme } from '../../theme/ThemeContext';

const RivetMapper = () => {
  const { isDark } = useTheme();
  const canvasRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const [selectedPreset, setSelectedPreset] = React.useState('rivet-examples');
  const [lineGroups, setLineGroups] = React.useState([]);
  const [currentGroup, setCurrentGroup] = React.useState([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = React.useState(null);
  const [draggingDot, setDraggingDot] = React.useState(null);
  const [lastClickTime, setLastClickTime] = React.useState(0);
  const [referenceImage, setReferenceImage] = React.useState(null);
  const [imagePositioning, setImagePositioning] = React.useState(false);
  const [imagePosition, setImagePosition] = React.useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = React.useState({ width: 352, height: 496 });
  const [draggingImage, setDraggingImage] = React.useState(false);
  const [resizingImage, setResizingImage] = React.useState(null);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [animationIndex, setAnimationIndex] = React.useState(0);
  const [fadeOpacity, setFadeOpacity] = React.useState(1);
  const [cropMode, setCropMode] = React.useState(false);
  const [cropBounds, setCropBounds] = React.useState({ x: 0, y: 0, width: 100, height: 100 });
  const [draggingCrop, setDraggingCrop] = React.useState(false);
  const [resizingCrop, setResizingCrop] = React.useState(null);
  const [showSubmitModal, setShowSubmitModal] = React.useState(false);
  const [submitForm, setSubmitForm] = React.useState({ name: '', category: 'animals', description: '' });
  const [showSaveWarning, setShowSaveWarning] = React.useState(false);
  const [pendingPreset, setPendingPreset] = React.useState(null);
  const [approvedDesigns, setApprovedDesigns] = React.useState({});
  const [loadingDesigns, setLoadingDesigns] = React.useState(true);
  const [isTracing, setIsTracing] = React.useState(false);
  
  const isCustomMode = selectedPreset === 'custom';
  const isAnimatedMode = selectedPreset === 'rivet-examples';
  
  const presets = {
    rivet: [
      { x: 176, y: 96 },
      { x: 192, y: 96 },
      { x: 176, y: 112 },
      { x: 192, y: 112 },
      { x: 176, y: 128 },
      { x: 192, y: 128 },
      { x: 208, y: 128 },
      { x: 256, y: 160 },
      { x: 272, y: 176 },
      { x: 288, y: 224 },
      { x: 288, y: 272 },
      { x: 288, y: 256 },
      { x: 288, y: 240 },
      { x: 288, y: 208 },
      { x: 272, y: 160 },
      { x: 256, y: 144 },
      { x: 240, y: 128 },
      { x: 224, y: 128 },
      { x: 208, y: 112 },
      { x: 224, y: 112 },
      { x: 256, y: 128 },
      { x: 272, y: 144 },
      { x: 288, y: 192 },
      { x: 288, y: 176 },
      { x: 288, y: 160 },
      { x: 304, y: 176 },
      { x: 304, y: 192 },
      { x: 304, y: 208 },
      { x: 320, y: 208 },
      { x: 320, y: 224 },
      { x: 304, y: 224 },
      { x: 304, y: 240 },
      { x: 320, y: 240 },
      { x: 320, y: 256 },
      { x: 304, y: 256 },
      { x: 304, y: 272 },
      { x: 320, y: 272 },
      { x: 304, y: 288 },
      { x: 304, y: 304 },
      { x: 288, y: 304 },
      { x: 288, y: 288 },
      { x: 272, y: 304 },
      { x: 256, y: 320 },
      { x: 240, y: 336 },
      { x: 192, y: 352 },
      { x: 208, y: 352 },
      { x: 176, y: 352 },
      { x: 240, y: 352 },
      { x: 256, y: 336 },
      { x: 272, y: 320 },
      { x: 288, y: 320 },
      { x: 272, y: 336 },
      { x: 256, y: 352 },
      { x: 224, y: 368 },
      { x: 208, y: 368 },
      { x: 192, y: 368 },
      { x: 176, y: 368 },
      { x: 176, y: 384 },
      { x: 208, y: 384 },
      { x: 192, y: 384 },
      { x: 240, y: 368 },
      { x: 240, y: 112 },
      { x: 176, y: 160 },
      { x: 192, y: 160 },
      { x: 224, y: 176 },
      { x: 208, y: 176 },
      { x: 240, y: 192 },
      { x: 240, y: 208 },
      { x: 256, y: 224 },
      { x: 256, y: 256 },
      { x: 256, y: 240 },
      { x: 240, y: 240 },
      { x: 240, y: 224 },
      { x: 224, y: 192 },
      { x: 224, y: 208 },
      { x: 208, y: 192 },
      { x: 192, y: 192 },
      { x: 192, y: 176 },
      { x: 176, y: 176 },
      { x: 176, y: 192 },
      { x: 208, y: 208 },
      { x: 224, y: 224 },
      { x: 224, y: 240 },
      { x: 192, y: 288 },
      { x: 224, y: 272 },
      { x: 240, y: 256 },
      { x: 240, y: 272 },
      { x: 240, y: 288 },
      { x: 208, y: 288 },
      { x: 224, y: 288 },
      { x: 224, y: 304 },
      { x: 208, y: 304 },
      { x: 192, y: 304 },
      { x: 192, y: 320 },
      { x: 224, y: 256 },
      { x: 208, y: 272 },
      { x: 176, y: 288 },
      { x: 176, y: 304 },
      { x: 160, y: 304 },
      { x: 144, y: 304 },
      { x: 144, y: 288 },
      { x: 160, y: 288 },
      { x: 144, y: 272 },
      { x: 160, y: 192 },
      { x: 160, y: 176 },
      { x: 144, y: 176 },
      { x: 144, y: 192 },
      { x: 144, y: 208 },
      { x: 128, y: 208 },
      { x: 128, y: 192 },
      { x: 112, y: 208 },
      { x: 112, y: 224 },
      { x: 128, y: 224 },
      { x: 96, y: 240 },
      { x: 112, y: 240 },
      { x: 128, y: 240 },
      { x: 112, y: 256 },
      { x: 128, y: 256 },
      { x: 112, y: 272 },
      { x: 128, y: 272 },
      { x: 128, y: 288 },
      { x: 112, y: 288 },
      { x: 96, y: 256 },
      { x: 96, y: 224 },
      { x: 112, y: 192 },
      { x: 128, y: 176 },
      { x: 160, y: 160 },
      { x: 160, y: 320 },
      { x: 176, y: 320 },
      { x: 128, y: 304 },
      { x: 320, y: 288 },
      { x: 304, y: 320 },
      { x: 288, y: 336 },
      { x: 272, y: 352 },
      { x: 256, y: 368 },
      { x: 224, y: 384 },
      { x: 256, y: 208 },
      { x: 224, y: 352 },
      { x: 224, y: 336 },
      { x: 208, y: 96 },
      { x: 224, y: 96 },
      { x: 272, y: 128 },
      { x: 288, y: 144 },
      { x: 304, y: 160 },
      { x: 320, y: 192 },
      { x: 256, y: 112 },
      { x: 96, y: 208 },
      { x: 96, y: 272 },
      { x: 256, y: 272 },
      { x: 144, y: 352 },
      { x: 160, y: 352 },
      { x: 160, y: 368 },
      { x: 144, y: 368 },
      { x: 144, y: 384 },
      { x: 160, y: 384 },
      { x: 128, y: 384 },
      { x: 128, y: 352 },
      { x: 128, y: 368 },
      { x: 112, y: 368 },
      { x: 112, y: 352 },
      { x: 96, y: 368 },
      { x: 96, y: 352 },
      { x: 96, y: 336 },
      { x: 80, y: 352 },
      { x: 80, y: 336 },
      { x: 80, y: 320 },
      { x: 64, y: 336 },
      { x: 64, y: 320 },
      { x: 64, y: 304 },
      { x: 64, y: 272 },
      { x: 64, y: 256 },
      { x: 64, y: 224 },
      { x: 64, y: 160 },
      { x: 64, y: 144 },
      { x: 80, y: 144 },
      { x: 80, y: 160 },
      { x: 80, y: 176 },
      { x: 64, y: 192 },
      { x: 64, y: 208 },
      { x: 48, y: 160 },
      { x: 64, y: 176 },
      { x: 48, y: 192 },
      { x: 48, y: 176 },
      { x: 32, y: 192 },
      { x: 32, y: 208 },
      { x: 16, y: 240 },
      { x: 16, y: 224 },
      { x: 16, y: 256 },
      { x: 32, y: 224 },
      { x: 32, y: 256 },
      { x: 32, y: 240 },
      { x: 32, y: 272 },
      { x: 32, y: 288 },
      { x: 48, y: 304 },
      { x: 48, y: 320 },
      { x: 96, y: 320 },
      { x: 112, y: 336 },
      { x: 80, y: 304 },
      { x: 48, y: 288 },
      { x: 64, y: 288 },
      { x: 48, y: 256 },
      { x: 48, y: 272 },
      { x: 48, y: 208 },
      { x: 48, y: 224 },
      { x: 48, y: 240 },
      { x: 64, y: 240 },
      { x: 96, y: 160 },
      { x: 112, y: 144 },
      { x: 144, y: 128 },
      { x: 160, y: 128 },
      { x: 128, y: 128 },
      { x: 160, y: 112 },
      { x: 144, y: 112 },
      { x: 144, y: 96 },
      { x: 160, y: 96 },
      { x: 128, y: 96 },
      { x: 128, y: 112 },
      { x: 112, y: 96 },
      { x: 112, y: 112 },
      { x: 112, y: 128 },
      { x: 96, y: 144 },
      { x: 96, y: 128 },
      { x: 96, y: 112 },
      { x: 64, y: 128 },
      { x: 80, y: 112 },
      { x: 80, y: 128 },
      { x: 48, y: 144 },
      { x: 16, y: 272 },
      { x: 32, y: 304 },
      { x: 32, y: 176 },
      { x: 16, y: 208 },
      { x: 208, y: 160 },
      { x: 144, y: 320 },
      { x: 240, y: 144 }
    ],
    bicycle: [
      { x: 256, y: 160 },
      { x: 208, y: 160 },
      { x: 208, y: 176 },
      { x: 224, y: 192 },
      { x: 240, y: 192 },
      { x: 256, y: 192 },
      { x: 144, y: 208 },
      { x: 128, y: 208 },
      { x: 208, y: 224 },
      { x: 64, y: 224 },
      { x: 80, y: 224 },
      { x: 48, y: 240 },
      { x: 112, y: 240 },
      { x: 192, y: 240 },
      { x: 208, y: 240 },
      { x: 224, y: 240 },
      { x: 240, y: 240 },
      { x: 304, y: 240 },
      { x: 128, y: 256 },
      { x: 144, y: 256 },
      { x: 176, y: 256 },
      { x: 192, y: 256 },
      { x: 208, y: 256 },
      { x: 240, y: 256 },
      { x: 320, y: 256 },
      { x: 160, y: 256 },
      { x: 32, y: 272 },
      { x: 144, y: 272 },
      { x: 160, y: 272 },
      { x: 176, y: 272 },
      { x: 192, y: 272 },
      { x: 320, y: 272 },
      { x: 32, y: 288 },
      { x: 160, y: 288 },
      { x: 176, y: 288 },
      { x: 320, y: 288 },
      { x: 144, y: 288 },
      { x: 32, y: 304 },
      { x: 80, y: 304 },
      { x: 144, y: 304 },
      { x: 160, y: 304 },
      { x: 176, y: 304 },
      { x: 208, y: 304 },
      { x: 320, y: 304 },
      { x: 192, y: 304 },
      { x: 32, y: 320 },
      { x: 112, y: 320 },
      { x: 224, y: 320 },
      { x: 320, y: 320 },
      { x: 48, y: 336 },
      { x: 112, y: 336 },
      { x: 224, y: 336 },
      { x: 304, y: 336 },
      { x: 64, y: 352 },
      { x: 96, y: 352 },
      { x: 240, y: 352 },
      { x: 256, y: 352 },
      { x: 288, y: 352 },
      { x: 144, y: 240 },
      { x: 160, y: 208 },
      { x: 144, y: 224 },
      { x: 208, y: 272 },
      { x: 224, y: 256 },
      { x: 240, y: 272 },
      { x: 208, y: 288 },
      { x: 288, y: 224 },
      { x: 272, y: 224 },
      { x: 272, y: 304 },
      { x: 256, y: 288 },
      { x: 80, y: 352 },
      { x: 32, y: 256 },
      { x: 112, y: 272 },
      { x: 224, y: 224 },
      { x: 240, y: 208 },
      { x: 240, y: 224 },
      { x: 256, y: 224 },
      { x: 160, y: 320 },
      { x: 144, y: 320 },
      { x: 128, y: 320 },
      { x: 96, y: 224 },
      { x: 240, y: 160 },
      { x: 192, y: 160 },
      { x: 256, y: 176 },
      { x: 80, y: 288 },
      { x: 96, y: 304 },
      { x: 96, y: 288 }
    ],
    rabbit: [
      { x: 176, y: 432 },
      { x: 160, y: 432 },
      { x: 128, y: 432 },
      { x: 112, y: 416 },
      { x: 80, y: 400 },
      { x: 64, y: 384 },
      { x: 48, y: 352 },
      { x: 48, y: 336 },
      { x: 48, y: 320 },
      { x: 48, y: 288 },
      { x: 64, y: 256 },
      { x: 80, y: 240 },
      { x: 96, y: 224 },
      { x: 64, y: 160 },
      { x: 48, y: 80 },
      { x: 48, y: 64 },
      { x: 80, y: 32 },
      { x: 144, y: 128 },
      { x: 144, y: 176 },
      { x: 160, y: 192 },
      { x: 176, y: 192 },
      { x: 192, y: 192 },
      { x: 208, y: 176 },
      { x: 208, y: 160 },
      { x: 208, y: 144 },
      { x: 208, y: 128 },
      { x: 224, y: 112 },
      { x: 224, y: 96 },
      { x: 240, y: 80 },
      { x: 240, y: 64 },
      { x: 256, y: 48 },
      { x: 272, y: 32 },
      { x: 304, y: 64 },
      { x: 304, y: 80 },
      { x: 288, y: 112 },
      { x: 304, y: 96 },
      { x: 288, y: 128 },
      { x: 288, y: 144 },
      { x: 288, y: 176 },
      { x: 272, y: 192 },
      { x: 256, y: 208 },
      { x: 256, y: 224 },
      { x: 288, y: 160 },
      { x: 144, y: 160 },
      { x: 144, y: 144 },
      { x: 128, y: 112 },
      { x: 128, y: 96 },
      { x: 112, y: 80 },
      { x: 112, y: 64 },
      { x: 96, y: 48 },
      { x: 64, y: 32 },
      { x: 48, y: 48 },
      { x: 48, y: 96 },
      { x: 64, y: 112 },
      { x: 64, y: 128 },
      { x: 64, y: 144 },
      { x: 64, y: 176 },
      { x: 80, y: 192 },
      { x: 96, y: 208 },
      { x: 224, y: 288 },
      { x: 240, y: 288 },
      { x: 128, y: 304 },
      { x: 112, y: 304 },
      { x: 112, y: 288 },
      { x: 128, y: 288 },
      { x: 96, y: 288 },
      { x: 176, y: 304 },
      { x: 160, y: 320 },
      { x: 192, y: 320 },
      { x: 176, y: 320 },
      { x: 176, y: 336 },
      { x: 176, y: 352 },
      { x: 192, y: 368 },
      { x: 160, y: 368 },
      { x: 208, y: 368 },
      { x: 224, y: 352 },
      { x: 144, y: 368 },
      { x: 128, y: 352 },
      { x: 176, y: 368 },
      { x: 208, y: 384 },
      { x: 208, y: 400 },
      { x: 192, y: 400 },
      { x: 176, y: 400 },
      { x: 160, y: 400 },
      { x: 144, y: 400 },
      { x: 144, y: 384 },
      { x: 176, y: 384 },
      { x: 64, y: 272 },
      { x: 48, y: 304 },
      { x: 64, y: 368 },
      { x: 96, y: 416 },
      { x: 144, y: 432 },
      { x: 192, y: 432 },
      { x: 208, y: 432 },
      { x: 224, y: 432 },
      { x: 240, y: 416 },
      { x: 256, y: 416 },
      { x: 272, y: 400 },
      { x: 288, y: 384 },
      { x: 288, y: 368 },
      { x: 304, y: 352 },
      { x: 304, y: 336 },
      { x: 304, y: 320 },
      { x: 304, y: 304 },
      { x: 304, y: 288 },
      { x: 288, y: 272 },
      { x: 288, y: 256 },
      { x: 272, y: 240 },
      { x: 240, y: 304 },
      { x: 224, y: 304 },
      { x: 256, y: 288 },
      { x: 288, y: 32 },
      { x: 304, y: 48 }
    ],
    dog: [
      { x: 176, y: 352 }, { x: 192, y: 352 }, { x: 208, y: 352 }, { x: 224, y: 336 },
      { x: 240, y: 336 }, { x: 256, y: 320 }, { x: 272, y: 304 }, { x: 272, y: 288 },
      { x: 272, y: 272 }, { x: 272, y: 256 }, { x: 304, y: 272 }, { x: 288, y: 272 },
      { x: 320, y: 256 }, { x: 320, y: 240 }, { x: 320, y: 224 }, { x: 320, y: 208 },
      { x: 320, y: 192 }, { x: 320, y: 176 }, { x: 304, y: 160 }, { x: 304, y: 144 },
      { x: 288, y: 128 }, { x: 272, y: 128 }, { x: 256, y: 144 }, { x: 272, y: 160 },
      { x: 272, y: 176 }, { x: 272, y: 192 }, { x: 272, y: 208 }, { x: 272, y: 240 },
      { x: 272, y: 224 }, { x: 240, y: 128 }, { x: 224, y: 128 }, { x: 208, y: 112 },
      { x: 176, y: 112 }, { x: 192, y: 112 }, { x: 160, y: 112 }, { x: 144, y: 112 },
      { x: 128, y: 128 }, { x: 112, y: 128 }, { x: 96, y: 144 }, { x: 80, y: 160 },
      { x: 80, y: 176 }, { x: 80, y: 192 }, { x: 80, y: 208 }, { x: 80, y: 224 },
      { x: 80, y: 240 }, { x: 80, y: 256 }, { x: 80, y: 272 }, { x: 80, y: 288 },
      { x: 64, y: 272 }, { x: 48, y: 272 }, { x: 32, y: 256 }, { x: 32, y: 240 },
      { x: 32, y: 224 }, { x: 32, y: 208 }, { x: 32, y: 192 }, { x: 32, y: 176 },
      { x: 48, y: 160 }, { x: 48, y: 144 }, { x: 64, y: 128 }, { x: 80, y: 128 },
      { x: 128, y: 192 }, { x: 144, y: 192 }, { x: 144, y: 208 }, { x: 128, y: 208 },
      { x: 160, y: 240 }, { x: 176, y: 240 }, { x: 192, y: 240 }, { x: 192, y: 256 },
      { x: 176, y: 256 }, { x: 160, y: 256 }, { x: 176, y: 272 }, { x: 176, y: 288 },
      { x: 176, y: 304 }, { x: 160, y: 304 }, { x: 144, y: 304 }, { x: 128, y: 288 },
      { x: 192, y: 304 }, { x: 208, y: 304 }, { x: 224, y: 288 }, { x: 160, y: 352 },
      { x: 144, y: 352 }, { x: 128, y: 336 }, { x: 112, y: 336 }, { x: 96, y: 320 },
      { x: 80, y: 304 }, { x: 208, y: 208 }, { x: 208, y: 192 }, { x: 224, y: 192 },
      { x: 224, y: 208 }, { x: 240, y: 192 }, { x: 112, y: 192 }
    ],
    surfer: [
      { x: 176, y: 176 }, { x: 160, y: 192 }, { x: 160, y: 208 }, { x: 176, y: 224 },
      { x: 192, y: 208 }, { x: 192, y: 192 },
      { x: 176, y: 224 }, { x: 176, y: 240 }, { x: 176, y: 256 }, { x: 176, y: 272 },
      { x: 176, y: 240 }, { x: 160, y: 256 }, { x: 144, y: 272 }, { x: 128, y: 288 },
      { x: 176, y: 240 }, { x: 192, y: 256 }, { x: 208, y: 272 }, { x: 224, y: 288 },
      { x: 176, y: 272 }, { x: 160, y: 288 }, { x: 144, y: 304 }, { x: 144, y: 320 },
      { x: 176, y: 272 }, { x: 192, y: 288 }, { x: 208, y: 304 }, { x: 208, y: 320 },
      { x: 96, y: 304 }, { x: 112, y: 304 }, { x: 128, y: 304 }, { x: 144, y: 304 },
      { x: 160, y: 304 }, { x: 176, y: 304 }, { x: 192, y: 304 }, { x: 208, y: 304 },
      { x: 224, y: 304 }, { x: 240, y: 304 }, { x: 256, y: 304 }
    ]
  };

  const animationSequence = ['rivet', 'bicycle', 'rabbit', 'dog', 'surfer'];

  // Fetch approved designs from Firebase on mount
  React.useEffect(() => {
    const fetchApprovedDesigns = async () => {
      try {
        setLoadingDesigns(true);
        
        const q = query(collection(db, 'designs'), where('status', '==', 'approved'));
        const querySnapshot = await getDocs(q);
        
        const designs = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const designKey = data.name.toLowerCase().replace(/\s+/g, '-');
          designs[designKey] = data.dots;
        });
        
        setApprovedDesigns(designs);
        setLoadingDesigns(false);
      } catch (error) {
        console.error('Error fetching designs:', error);
        setLoadingDesigns(false);
      }
    };

    fetchApprovedDesigns();
  }, []);

  const handlePresetChange = (newPreset) => {
    const hasWork = currentGroup.length > 0 || lineGroups.length > 0;
    
    if (isCustomMode && hasWork && newPreset !== 'custom') {
      setPendingPreset(newPreset);
      setShowSaveWarning(true);
    } else {
      setSelectedPreset(newPreset);
    }
  };

  const handleDiscardAndSwitch = () => {
    clearCustom();
    
    if (pendingPreset === 'custom') {
      setSelectedPreset('custom');
      setReferenceImage(null);
    } else {
      setSelectedPreset(pendingPreset);
    }
    
    setShowSaveWarning(false);
    setPendingPreset(null);
  };

  const handleCancelSwitch = () => {
    setShowSaveWarning(false);
    setPendingPreset(null);
  };

  const handleSaveAndSwitch = (saveType) => {
    if (saveType === 'png') {
      saveImage();
    } else if (saveType === 'dots') {
      exportDots();
    }
    setTimeout(() => {
      handleDiscardAndSwitch();
    }, 100);
  };

  React.useEffect(() => {
    if (!isAnimatedMode) return;

    const cycleDuration = 3000;
    const fadeDuration = 300;

    const interval = setInterval(() => {
      setFadeOpacity(0);
      
      setTimeout(() => {
        setAnimationIndex((prev) => (prev + 1) % animationSequence.length);
        setFadeOpacity(1);
      }, fadeDuration);
      
    }, cycleDuration);

    return () => clearInterval(interval);
  }, [isAnimatedMode]);

  React.useEffect(() => {
    if (isAnimatedMode) {
      setAnimationIndex(0);
      setFadeOpacity(1);
    }
  }, [isAnimatedMode]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const colors = isDark
      ? {
          bg: '#262626',
          grid: '#404040',
          dotOuter: '#525252',
          dotOuterSelected: '#666666',
          dotInner: '#737373',
          dotInnerSelected: '#a3a3a3',
          accent: '#3b82f6',
          overlay: 'rgba(0, 0, 0, 0.6)'
        }
      : {
          bg: '#fafafa',
          grid: '#e5e5e5',
          dotOuter: '#a3a3a3',
          dotOuterSelected: '#737373',
          dotInner: '#525252',
          dotInnerSelected: '#404040',
          accent: '#3b82f6',
          overlay: 'rgba(0, 0, 0, 0.15)'
        };

    let dots;
    if (isCustomMode) {
      dots = [...currentGroup, ...lineGroups.flat()];
    } else if (isAnimatedMode) {
      dots = allPresets[animationSequence[animationIndex]];
    } else {
      dots = allPresets[selectedPreset];
    }

    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, 352, 496);
    
    if (isCustomMode && referenceImage) {
      ctx.globalAlpha = imagePositioning ? 0.5 : 0.3;
      ctx.drawImage(
        referenceImage, 
        imagePosition.x, 
        imagePosition.y, 
        imageSize.width, 
        imageSize.height
      );
      ctx.globalAlpha = 1.0;
      
      if (imagePositioning) {
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 2;
        ctx.strokeRect(imagePosition.x, imagePosition.y, imageSize.width, imageSize.height);

        const handleSize = 10;
        const corners = [
          { x: imagePosition.x, y: imagePosition.y },
          { x: imagePosition.x + imageSize.width, y: imagePosition.y },
          { x: imagePosition.x, y: imagePosition.y + imageSize.height },
          { x: imagePosition.x + imageSize.width, y: imagePosition.y + imageSize.height }
        ];

        ctx.fillStyle = colors.accent;
        corners.forEach(corner => {
          ctx.fillRect(corner.x - handleSize/2, corner.y - handleSize/2, handleSize, handleSize);
        });
      }
      
      if (cropMode) {
        ctx.fillStyle = colors.overlay;

        if (cropBounds.y > 0) {
          ctx.fillRect(0, 0, 352, cropBounds.y);
        }
        if (cropBounds.y + cropBounds.height < 496) {
          ctx.fillRect(0, cropBounds.y + cropBounds.height, 352, 496 - (cropBounds.y + cropBounds.height));
        }
        if (cropBounds.x > 0) {
          ctx.fillRect(0, cropBounds.y, cropBounds.x, cropBounds.height);
        }
        if (cropBounds.x + cropBounds.width < 352) {
          ctx.fillRect(cropBounds.x + cropBounds.width, cropBounds.y, 352 - (cropBounds.x + cropBounds.width), cropBounds.height);
        }
        
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 2;
        ctx.strokeRect(cropBounds.x, cropBounds.y, cropBounds.width, cropBounds.height);

        const cornerSize = 12;
        const cropCorners = [
          { x: cropBounds.x, y: cropBounds.y },
          { x: cropBounds.x + cropBounds.width, y: cropBounds.y },
          { x: cropBounds.x, y: cropBounds.y + cropBounds.height },
          { x: cropBounds.x + cropBounds.width, y: cropBounds.y + cropBounds.height }
        ];

        ctx.fillStyle = colors.accent;
        cropCorners.forEach(corner => {
          ctx.fillRect(corner.x - cornerSize/2, corner.y - cornerSize/2, cornerSize, cornerSize);
        });
        
        const edgeSize = 10;
        const edgeHandles = [
          { x: cropBounds.x + cropBounds.width / 2, y: cropBounds.y },
          { x: cropBounds.x + cropBounds.width / 2, y: cropBounds.y + cropBounds.height },
          { x: cropBounds.x, y: cropBounds.y + cropBounds.height / 2 },
          { x: cropBounds.x + cropBounds.width, y: cropBounds.y + cropBounds.height / 2 }
        ];
        
        edgeHandles.forEach(handle => {
          ctx.fillRect(handle.x - edgeSize/2, handle.y - edgeSize/2, edgeSize, edgeSize);
        });
      }
    }
    
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 352; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 496);
      ctx.stroke();
    }
    for (let i = 0; i <= 496; i += 16) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(352, i);
      ctx.stroke();
    }
    
    if (isCustomMode) {
      lineGroups.forEach((group, groupIndex) => {
        const isSelected = groupIndex === selectedGroupIndex;
        group.forEach((dot) => {
          ctx.fillStyle = isSelected ? colors.dotOuterSelected : colors.dotOuter;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = isSelected ? colors.dotInnerSelected : colors.dotInner;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
          ctx.fill();
        });
      });
      currentGroup.forEach((dot) => {
        ctx.fillStyle = colors.dotOuterSelected;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = colors.dotInnerSelected;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      if (isAnimatedMode) {
        ctx.globalAlpha = fadeOpacity;
      }
      dots.forEach((dot) => {
        ctx.fillStyle = colors.dotOuter;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = colors.dotInner;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;
    }
  }, [selectedPreset, currentGroup, lineGroups, selectedGroupIndex, isCustomMode, referenceImage, imagePositioning, imagePosition, imageSize, isAnimatedMode, animationIndex, fadeOpacity, cropMode, cropBounds, isDark]);

  const handleReferenceUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvasWidth = 352;
          const canvasHeight = 496;
          const imgAspect = img.width / img.height;
          const canvasAspect = canvasWidth / canvasHeight;
          
          let width, height;
          if (imgAspect > canvasAspect) {
            width = canvasWidth * 0.8;
            height = width / imgAspect;
          } else {
            height = canvasHeight * 0.8;
            width = height * imgAspect;
          }
          
          setReferenceImage(img);
          setImageSize({ width, height });
          setImagePosition({ 
            x: (canvasWidth - width) / 2, 
            y: (canvasHeight - height) / 2 
          });
          setImagePositioning(true);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const removeReference = () => {
    setReferenceImage(null);
    setImagePositioning(false);
    setImagePosition({ x: 0, y: 0 });
    setImageSize({ width: 352, height: 496 });
    setCropMode(false);
    setCropBounds({ x: 0, y: 0, width: 100, height: 100 });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const enterCropMode = () => {
    const padding = 20;
    setCropBounds({
      x: imagePosition.x + padding,
      y: imagePosition.y + padding,
      width: imageSize.width - padding * 2,
      height: imageSize.height - padding * 2
    });
    setCropMode(true);
    setImagePositioning(false);
  };

  const cancelCrop = () => {
    setCropMode(false);
    setImagePositioning(true);
  };

  const applyCrop = () => {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    const relativeX = cropBounds.x - imagePosition.x;
    const relativeY = cropBounds.y - imagePosition.y;
    const scaleX = referenceImage.width / imageSize.width;
    const scaleY = referenceImage.height / imageSize.height;
    
    tempCanvas.width = cropBounds.width * scaleX;
    tempCanvas.height = cropBounds.height * scaleY;
    
    tempCtx.drawImage(
      referenceImage,
      relativeX * scaleX,
      relativeY * scaleY,
      cropBounds.width * scaleX,
      cropBounds.height * scaleY,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );
    
    const croppedImg = new Image();
    croppedImg.onload = () => {
      setReferenceImage(croppedImg);
      setImageSize({ width: cropBounds.width, height: cropBounds.height });
      setImagePosition({ x: cropBounds.x, y: cropBounds.y });
      setCropMode(false);
      setImagePositioning(true);
    };
    croppedImg.src = tempCanvas.toDataURL();
  };

  const traceImage = () => {
    if (!referenceImage) return;
    
    setIsTracing(true);
    
    setTimeout(() => {
      try {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 352;
        tempCanvas.height = 496;
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCtx.fillStyle = '#262626';
        tempCtx.fillRect(0, 0, 352, 496);
        tempCtx.drawImage(
          referenceImage,
          imagePosition.x,
          imagePosition.y,
          imageSize.width,
          imageSize.height
        );
        
        const imageData = tempCtx.getImageData(0, 0, 352, 496);
        const data = imageData.data;
        
        const insetPercent = 0.08;
        const minX = Math.max(1, Math.floor(imagePosition.x + imageSize.width * insetPercent));
        const maxX = Math.min(351, Math.ceil(imagePosition.x + imageSize.width * (1 - insetPercent)));
        const minY = Math.max(1, Math.floor(imagePosition.y + imageSize.height * insetPercent));
        const maxY = Math.min(495, Math.ceil(imagePosition.y + imageSize.height * (1 - insetPercent)));
        
        const edges = new Set();
        const threshold = 100;
        const edgeThreshold = 30;
        
        for (let y = minY; y < maxY; y++) {
          for (let x = minX; x < maxX; x++) {
            const idx = (y * 352 + x) * 4;
            const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
            
            if (brightness < threshold) {
              const neighbors = [
                (y * 352 + (x - 1)) * 4,
                (y * 352 + (x + 1)) * 4,
                ((y - 1) * 352 + x) * 4,
                ((y + 1) * 352 + x) * 4,
              ];
              
              let isEdge = false;
              for (const nIdx of neighbors) {
                const nBrightness = (data[nIdx] + data[nIdx + 1] + data[nIdx + 2]) / 3;
                if (Math.abs(brightness - nBrightness) > edgeThreshold) {
                  isEdge = true;
                  break;
                }
              }
              
              if (isEdge) {
                const gridX = Math.round(x / 16) * 16;
                const gridY = Math.round(y / 16) * 16;
                edges.add(`${gridX},${gridY}`);
              }
            }
          }
        }
        
        const tracedDots = Array.from(edges).map(coord => {
          const [x, y] = coord.split(',').map(Number);
          return { x, y };
        });
        
        let finalDots = tracedDots;
        if (tracedDots.length > 300) {
          const samplingRate = Math.ceil(tracedDots.length / 250);
          finalDots = tracedDots.filter((_, idx) => idx % samplingRate === 0);
        }
        
        if (finalDots.length > 0) {
          setCurrentGroup([...currentGroup, ...finalDots]);
          setImagePositioning(false);
        } else {
          alert('No edges detected. Try adjusting the image contrast or position.');
        }
      } catch (error) {
        console.error('Error tracing image:', error);
        alert('Error tracing image. Please try again.');
      } finally {
        setIsTracing(false);
      }
    }, 100);
  };

  const findDotAtPosition = (x, y, allDots) => {
    const threshold = 15;
    for (let i = 0; i < allDots.length; i++) {
      const dot = allDots[i];
      const distance = Math.sqrt((dot.x - x) ** 2 + (dot.y - y) ** 2);
      if (distance <= threshold) {
        return i;
      }
    }
    return -1;
  };

  const handleCanvasClick = (e) => {
    if (!isCustomMode || cropMode) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;
    
    const now = Date.now();
    const isDoubleClick = now - lastClickTime < 300;
    
    if (imagePositioning && referenceImage) {
      if (isDoubleClick && 
          clickX >= imagePosition.x && 
          clickX <= imagePosition.x + imageSize.width &&
          clickY >= imagePosition.y && 
          clickY <= imagePosition.y + imageSize.height) {
        setImagePositioning(false);
        setLastClickTime(0);
        return;
      }
      setLastClickTime(now);
      return;
    }
    
    const dotIndex = findDotAtPosition(clickX, clickY, currentGroup);
    
    if (dotIndex !== -1) {
      if (isDoubleClick) {
        const newGroup = currentGroup.filter((_, i) => i !== dotIndex);
        setCurrentGroup(newGroup);
        setLastClickTime(0);
        return;
      }
      setLastClickTime(now);
      return;
    }
    
    if (isDoubleClick) {
      for (let groupIndex = 0; groupIndex < lineGroups.length; groupIndex++) {
        const groupDotIndex = findDotAtPosition(clickX, clickY, lineGroups[groupIndex]);
        if (groupDotIndex !== -1) {
          const newGroups = [...lineGroups];
          newGroups[groupIndex] = newGroups[groupIndex].filter((_, i) => i !== groupDotIndex);
          if (newGroups[groupIndex].length === 0) {
            newGroups.splice(groupIndex, 1);
            setSelectedGroupIndex(null);
          }
          setLineGroups(newGroups);
          setLastClickTime(0);
          return;
        }
      }
    }
    
    const x = Math.round(clickX / 16) * 16;
    const y = Math.round(clickY / 16) * 16;
    
    if (x >= 0 && x <= 352 && y >= 0 && y <= 496) {
      setCurrentGroup([...currentGroup, { x, y }]);
    }
    
    setLastClickTime(now);
  };

  const handleMouseDown = (e) => {
    if (!isCustomMode) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;
    
    if (cropMode) {
      const cornerSize = 12;
      const edgeSize = 10;
      
      const corners = [
        { pos: 'tl', x: cropBounds.x, y: cropBounds.y },
        { pos: 'tr', x: cropBounds.x + cropBounds.width, y: cropBounds.y },
        { pos: 'bl', x: cropBounds.x, y: cropBounds.y + cropBounds.height },
        { pos: 'br', x: cropBounds.x + cropBounds.width, y: cropBounds.y + cropBounds.height }
      ];
      
      for (const corner of corners) {
        if (Math.abs(clickX - corner.x) <= cornerSize && 
            Math.abs(clickY - corner.y) <= cornerSize) {
          setResizingCrop(corner.pos);
          setDragStart({ x: clickX, y: clickY });
          return;
        }
      }
      
      const edges = [
        { pos: 't', x: cropBounds.x + cropBounds.width / 2, y: cropBounds.y },
        { pos: 'b', x: cropBounds.x + cropBounds.width / 2, y: cropBounds.y + cropBounds.height },
        { pos: 'l', x: cropBounds.x, y: cropBounds.y + cropBounds.height / 2 },
        { pos: 'r', x: cropBounds.x + cropBounds.width, y: cropBounds.y + cropBounds.height / 2 }
      ];
      
      for (const edge of edges) {
        if (Math.abs(clickX - edge.x) <= edgeSize && 
            Math.abs(clickY - edge.y) <= edgeSize) {
          setResizingCrop(edge.pos);
          setDragStart({ x: clickX, y: clickY });
          return;
        }
      }
      
      if (clickX >= cropBounds.x && 
          clickX <= cropBounds.x + cropBounds.width &&
          clickY >= cropBounds.y && 
          clickY <= cropBounds.y + cropBounds.height) {
        setDraggingCrop(true);
        setDragStart({ 
          x: clickX - cropBounds.x, 
          y: clickY - cropBounds.y 
        });
        return;
      }
      return;
    }
    
    if (imagePositioning && referenceImage) {
      const handleSize = 10;
      const corners = [
        { pos: 'tl', x: imagePosition.x, y: imagePosition.y },
        { pos: 'tr', x: imagePosition.x + imageSize.width, y: imagePosition.y },
        { pos: 'bl', x: imagePosition.x, y: imagePosition.y + imageSize.height },
        { pos: 'br', x: imagePosition.x + imageSize.width, y: imagePosition.y + imageSize.height }
      ];
      
      for (const corner of corners) {
        if (Math.abs(clickX - corner.x) <= handleSize && 
            Math.abs(clickY - corner.y) <= handleSize) {
          setResizingImage(corner.pos);
          setDragStart({ x: clickX, y: clickY });
          return;
        }
      }
      
      if (clickX >= imagePosition.x && 
          clickX <= imagePosition.x + imageSize.width &&
          clickY >= imagePosition.y && 
          clickY <= imagePosition.y + imageSize.height) {
        setDraggingImage(true);
        setDragStart({ 
          x: clickX - imagePosition.x, 
          y: clickY - imagePosition.y 
        });
        return;
      }
      return;
    }
    
    if (selectedGroupIndex !== null) {
      const selectedGroup = lineGroups[selectedGroupIndex];
      const dotIndex = findDotAtPosition(clickX, clickY, selectedGroup);
      
      if (dotIndex !== -1) {
        setDraggingDot({ groupIndex: selectedGroupIndex, dotIndex });
      }
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    
    if (draggingCrop) {
      const newX = Math.max(imagePosition.x, Math.min(imagePosition.x + imageSize.width - cropBounds.width, mouseX - dragStart.x));
      const newY = Math.max(imagePosition.y, Math.min(imagePosition.y + imageSize.height - cropBounds.height, mouseY - dragStart.y));
      setCropBounds({ ...cropBounds, x: newX, y: newY });
      return;
    }
    
    if (resizingCrop) {
      const minSize = 30;
      let newBounds = { ...cropBounds };
      
      if (resizingCrop === 'br') {
        newBounds.width = Math.max(minSize, Math.min(imagePosition.x + imageSize.width - cropBounds.x, mouseX - cropBounds.x));
        newBounds.height = Math.max(minSize, Math.min(imagePosition.y + imageSize.height - cropBounds.y, mouseY - cropBounds.y));
      } else if (resizingCrop === 'bl') {
        const anchorX = cropBounds.x + cropBounds.width;
        const newWidth = Math.max(minSize, Math.min(anchorX - imagePosition.x, anchorX - mouseX));
        newBounds.x = anchorX - newWidth;
        newBounds.width = newWidth;
        newBounds.height = Math.max(minSize, Math.min(imagePosition.y + imageSize.height - cropBounds.y, mouseY - cropBounds.y));
      } else if (resizingCrop === 'tr') {
        const anchorY = cropBounds.y + cropBounds.height;
        newBounds.width = Math.max(minSize, Math.min(imagePosition.x + imageSize.width - cropBounds.x, mouseX - cropBounds.x));
        const newHeight = Math.max(minSize, Math.min(anchorY - imagePosition.y, anchorY - mouseY));
        newBounds.y = anchorY - newHeight;
        newBounds.height = newHeight;
      } else if (resizingCrop === 'tl') {
        const anchorX = cropBounds.x + cropBounds.width;
        const anchorY = cropBounds.y + cropBounds.height;
        const newWidth = Math.max(minSize, Math.min(anchorX - imagePosition.x, anchorX - mouseX));
        const newHeight = Math.max(minSize, Math.min(anchorY - imagePosition.y, anchorY - mouseY));
        newBounds.x = anchorX - newWidth;
        newBounds.y = anchorY - newHeight;
        newBounds.width = newWidth;
        newBounds.height = newHeight;
      } else if (resizingCrop === 't') {
        const anchorY = cropBounds.y + cropBounds.height;
        const newHeight = Math.max(minSize, Math.min(anchorY - imagePosition.y, anchorY - mouseY));
        newBounds.y = anchorY - newHeight;
        newBounds.height = newHeight;
      } else if (resizingCrop === 'b') {
        newBounds.height = Math.max(minSize, Math.min(imagePosition.y + imageSize.height - cropBounds.y, mouseY - cropBounds.y));
      } else if (resizingCrop === 'l') {
        const anchorX = cropBounds.x + cropBounds.width;
        const newWidth = Math.max(minSize, Math.min(anchorX - imagePosition.x, anchorX - mouseX));
        newBounds.x = anchorX - newWidth;
        newBounds.width = newWidth;
      } else if (resizingCrop === 'r') {
        newBounds.width = Math.max(minSize, Math.min(imagePosition.x + imageSize.width - cropBounds.x, mouseX - cropBounds.x));
      }
      
      setCropBounds(newBounds);
      return;
    }
    
    if (draggingImage) {
      const newX = Math.max(0, Math.min(352 - imageSize.width, mouseX - dragStart.x));
      const newY = Math.max(0, Math.min(496 - imageSize.height, mouseY - dragStart.y));
      setImagePosition({ x: newX, y: newY });
      return;
    }
    
    if (resizingImage) {
      const aspectRatio = referenceImage.width / referenceImage.height;
      
      if (resizingImage === 'br') {
        const newWidth = Math.max(50, Math.min(352 - imagePosition.x, mouseX - imagePosition.x));
        const newHeight = newWidth / aspectRatio;
        if (imagePosition.y + newHeight <= 496) {
          setImageSize({ width: newWidth, height: newHeight });
        }
      } else if (resizingImage === 'bl') {
        const anchorX = imagePosition.x + imageSize.width;
        const newWidth = Math.max(50, Math.min(anchorX, anchorX - mouseX));
        const newHeight = newWidth / aspectRatio;
        if (imagePosition.y + newHeight <= 496) {
          setImagePosition({ ...imagePosition, x: anchorX - newWidth });
          setImageSize({ width: newWidth, height: newHeight });
        }
      } else if (resizingImage === 'tr') {
        const anchorY = imagePosition.y + imageSize.height;
        const newWidth = Math.max(50, Math.min(352 - imagePosition.x, mouseX - imagePosition.x));
        const newHeight = newWidth / aspectRatio;
        if (anchorY - newHeight >= 0) {
          setImagePosition({ ...imagePosition, y: anchorY - newHeight });
          setImageSize({ width: newWidth, height: newHeight });
        }
      } else if (resizingImage === 'tl') {
        const anchorX = imagePosition.x + imageSize.width;
        const anchorY = imagePosition.y + imageSize.height;
        const newWidth = Math.max(50, Math.min(anchorX, anchorX - mouseX));
        const newHeight = newWidth / aspectRatio;
        if (anchorY - newHeight >= 0) {
          setImagePosition({ x: anchorX - newWidth, y: anchorY - newHeight });
          setImageSize({ width: newWidth, height: newHeight });
        }
      }
      return;
    }
    
    if (draggingDot) {
      const x = Math.round(mouseX / 16) * 16;
      const y = Math.round(mouseY / 16) * 16;
      
      if (x >= 0 && x <= 352 && y >= 0 && y <= 496) {
        const newGroups = [...lineGroups];
        newGroups[draggingDot.groupIndex][draggingDot.dotIndex] = { x, y };
        setLineGroups(newGroups);
      }
    }
  };

  const handleMouseUp = () => {
    setDraggingDot(null);
    setDraggingImage(false);
    setResizingImage(null);
    setDraggingCrop(false);
    setResizingCrop(null);
  };

  const exportDots = () => {
    const allDots = isCustomMode ? [...currentGroup, ...lineGroups.flat()] : 
                    isAnimatedMode ? allPresets[animationSequence[animationIndex]] :
                    allPresets[selectedPreset];
    
    const dotsCode = allDots.map(dot => `      { x: ${dot.x}, y: ${dot.y} }`).join(',\n');
    const exportText = `[\n${dotsCode}\n    ]`;
    
    const blob = new Blob([exportText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = `${selectedPreset || 'custom'}-dots.txt`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const submitToLibrary = async () => {
    const allDots = isCustomMode ? [...currentGroup, ...lineGroups.flat()] : 
                    isAnimatedMode ? allPresets[animationSequence[animationIndex]] :
                    allPresets[selectedPreset];
    
    if (allDots.length === 0) {
      alert('Please create a design first!');
      return;
    }
    
    setShowSubmitModal(true);
  };

  const handleSubmit = async () => {
    if (!submitForm.name.trim()) {
      alert('Please enter a name for your design');
      return;
    }

    const allDots = isCustomMode ? [...currentGroup, ...lineGroups.flat()] : 
                    isAnimatedMode ? allPresets[animationSequence[animationIndex]] :
                    allPresets[selectedPreset];

    const submissionData = {
      name: submitForm.name,
      category: submitForm.category,
      description: submitForm.description,
      dots: allDots,
      dotCount: allDots.length,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    try {
      const docRef = await addDoc(collection(db, 'designs'), submissionData);
      console.log('Document written with ID: ', docRef.id);
      
      alert('Design submitted successfully! Thank you for your contribution. It will appear in the dropdown once approved.');
      setShowSubmitModal(false);
      setSubmitForm({ name: '', category: 'animals', description: '' });
    } catch (error) {
      console.error('Error submitting design:', error);
      alert('Error submitting design. Please try again.');
    }
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `rivet-dot-art-${selectedPreset}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const clearCustom = () => {
    setCurrentGroup([]);
    setLineGroups([]);
    setSelectedGroupIndex(null);
  };

  const undoLast = () => {
    if (currentGroup.length > 0) {
      setCurrentGroup(currentGroup.slice(0, -1));
    } else if (lineGroups.length > 0) {
      const lastGroup = lineGroups[lineGroups.length - 1];
      setCurrentGroup(lastGroup);
      setLineGroups(lineGroups.slice(0, -1));
    }
  };

  const presetOptions = [
    { value: 'rivet-examples', label: 'Rivet Examples' },
    { value: 'rivet', label: 'Rivet Logo' },
    { value: 'bicycle', label: 'Bicycle' },
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'dog', label: 'Dog' },
    { value: 'surfer', label: 'Surfer' },
    ...Object.keys(approvedDesigns).map(key => ({
      value: key,
      label: key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }))
  ];

  const allPresets = { ...presets, ...approvedDesigns };

  const handleCreateNewDesign = () => {
    const hasWork = currentGroup.length > 0 || lineGroups.length > 0;
    
    if (isCustomMode && hasWork) {
      setPendingPreset('custom');
      setShowSaveWarning(true);
    } else {
      setSelectedPreset('custom');
      setCurrentGroup([]);
      setLineGroups([]);
      setSelectedGroupIndex(null);
      setReferenceImage(null);
    }
  };

  return (
    <div className="bg-surface flex flex-col items-center justify-center p-8 lg:p-12">
      <div className="w-full max-w-md">
        <h3 className="text-heading text-2xl font-light mb-2 text-center">
          Rivet Mapper
        </h3>
        <p className="text-muted text-sm mb-6 text-center">
          Create and view rivet mappings
        </p>

        <div className="flex justify-between gap-6 mb-6">
          <div className="w-fit" data-theme={isDark ? 'dark' : 'light'}>
            <select
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="rivet-preset-select bg-transparent text-heading border border-tag rounded-full px-4 py-1.5 text-xs font-light focus:outline-none focus:border-body hover:border-body transition-colors appearance-none text-left cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '2.5rem',
                width: 'fit-content',
                maxWidth: '100%'
              }}
            >
              {presetOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
              {isCustomMode && (
                <option value="custom">Custom Design</option>
              )}
              {loadingDesigns && (
                <option disabled>Loading community designs...</option>
              )}
            </select>
            <style>{`
              [data-theme="light"] .rivet-preset-select option {
                background: #f5f5f5;
                color: #111827;
              }
              [data-theme="dark"] .rivet-preset-select option {
                background: #262626;
                color: #e5e7eb;
              }
            `}</style>
          </div>
          
          {isCustomMode ? (
            <select
              onChange={(e) => {
                if (e.target.value === 'png') saveImage();
                if (e.target.value === 'dots') exportDots();
                if (e.target.value === 'submit') submitToLibrary();
                e.target.value = '';
              }}
              className="px-4 py-1.5 bg-transparent border border-tag text-body rounded-full text-xs font-light hover:border-body hover:text-heading transition-colors appearance-none text-left cursor-pointer whitespace-nowrap"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a3a3a3' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '2.5rem'
              }}
            >
              <option value="">Save Design</option>
              <option value="png">Save as PNG</option>
              <option value="dots">Export Dots</option>
              <option value="submit">Submit to Library</option>
            </select>
          ) : isAnimatedMode ? (
            <button
              onClick={handleCreateNewDesign}
              className="px-4 py-1.5 bg-transparent border border-tag text-body rounded-full text-xs font-light hover:border-body hover:text-heading transition-colors whitespace-nowrap"
            >
              Create New Design
            </button>
          ) : (
            <select
              onChange={(e) => {
                if (e.target.value === 'png') saveImage();
                if (e.target.value === 'dots') exportDots();
                if (e.target.value === 'new') handleCreateNewDesign();
                if (e.target.value === 'submit') submitToLibrary();
                e.target.value = '';
              }}
              className="px-4 py-1.5 bg-transparent border border-tag text-body rounded-full text-xs font-light hover:border-body hover:text-heading transition-colors appearance-none text-left cursor-pointer whitespace-nowrap"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '2.5rem'
              }}
            >
              <option value="">Actions</option>
              <option value="png">Save as PNG</option>
              <option value="dots">Export Dots</option>
              <option value="submit">Submit to Library</option>
              <option value="new">Create New Design</option>
            </select>
          )}
        </div>
        
        <div className="bg-deep rounded-lg mb-4" style={{ border: '3px solid rgb(var(--color-border-main))' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleReferenceUpload}
            className="hidden"
          />
          <canvas
            ref={canvasRef}
            width={352}
            height={496}
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`w-full rounded ${
              !isCustomMode ? 'cursor-default' : 
              cropMode ? 'cursor-move' :
              imagePositioning ? 'cursor-move' : 
              'cursor-crosshair'
            }`}
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
        
        <div className="flex gap-2 justify-center flex-wrap mb-4">
          {isCustomMode && (
            <>
              <button
                onClick={() => referenceImage ? removeReference() : fileInputRef.current?.click()}
                disabled={imagePositioning || cropMode}
                className="px-4 py-1.5 bg-transparent border border-tag text-body rounded-full text-xs font-light hover:border-body hover:text-heading transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-tag disabled:hover:text-body"
              >
                Reference Image
                {referenceImage && !imagePositioning && !cropMode && (
                  <span className="text-muted">×</span>
                )}
              </button>
              
              {referenceImage && !imagePositioning && !cropMode && (
                <button
                  onClick={() => setImagePositioning(true)}
                  className="px-4 py-1.5 bg-transparent border border-tag text-body rounded-full text-xs font-light hover:border-body hover:text-heading transition-colors"
                >
                  Edit Image
                </button>
              )}
              
              {referenceImage && imagePositioning && !cropMode && (
                <>
                  <button
                    onClick={enterCropMode}
                    className="px-4 py-1.5 bg-transparent border border-tag text-body rounded-full text-xs font-light hover:border-body hover:text-heading transition-colors"
                  >
                    Crop Image
                  </button>
                  <button
                    onClick={traceImage}
                    disabled={isTracing}
                    className="px-4 py-1.5 bg-blue-600 border border-blue-600 text-white rounded-full text-xs font-light hover:bg-blue-700 hover:border-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isTracing ? 'Tracing...' : 'Trace Image'}
                  </button>
                </>
              )}
              
              {cropMode && (
                <>
                  <button
                    onClick={applyCrop}
                    className="px-4 py-1.5 bg-blue-600 border border-blue-600 text-white rounded-full text-xs font-light hover:bg-blue-700 hover:border-blue-700 transition-colors"
                  >
                    Apply Crop
                  </button>
                  <button
                    onClick={cancelCrop}
                    className="px-4 py-1.5 bg-transparent border border-tag text-body rounded-full text-xs font-light hover:border-body hover:text-heading transition-colors"
                  >
                    Cancel Crop
                  </button>
                </>
              )}
              
              <button
                onClick={undoLast}
                disabled={imagePositioning || cropMode || (currentGroup.length === 0 && lineGroups.length === 0)}
                className="px-4 py-1.5 bg-transparent border border-tag text-body rounded-full text-xs font-light hover:border-body hover:text-heading transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-tag disabled:hover:text-body"
              >
                Undo
              </button>
              <button
                onClick={clearCustom}
                disabled={imagePositioning || cropMode || (currentGroup.length === 0 && lineGroups.length === 0)}
                className="px-4 py-1.5 bg-transparent border border-tag text-body rounded-full text-xs font-light hover:border-body hover:text-heading transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-tag disabled:hover:text-body"
              >
                Clear
              </button>
              <button
                onClick={saveImage}
                disabled={imagePositioning || cropMode}
                className="px-4 py-1.5 bg-transparent border border-tag text-body rounded-full text-xs font-light hover:border-body hover:text-heading transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-tag disabled:hover:text-body"
              >
                Save PNG
              </button>
            </>
          )}
        </div>
        
        {isCustomMode && (
          <p className="text-faint text-sm text-center mt-4">
            {cropMode ? (
              <>Drag crop area to move • Drag handles to resize • Apply Crop to keep selection</>
            ) : imagePositioning ? (
              <>Drag to move image • Drag corners to resize • Click Trace to auto-detect edges • Double-click to place</>
            ) : (
              <>Click to add dots • Double-click dot to remove</>
            )}
          </p>
        )}
        
        {isAnimatedMode && (
          <p className="text-muted text-sm text-center mt-4">
            Cycling through examples automatically...
          </p>
        )}
        
        {!isCustomMode && !isAnimatedMode && (
          <p className="text-muted text-sm text-center mt-4">
            Connect the dots to reveal the shape!
          </p>
        )}
      </div>
      
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-light text-heading mb-6">Submit to Library</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-heading mb-2 text-sm">Design Name*</label>
                <input
                  type="text"
                  value={submitForm.name}
                  onChange={(e) => setSubmitForm({ ...submitForm, name: e.target.value })}
                  placeholder="e.g., Happy Dog"
                  className="w-full bg-deep border border-main rounded-lg px-4 py-2 text-heading placeholder:text-muted focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-heading mb-2 text-sm">Category*</label>
                <select
                  value={submitForm.category}
                  onChange={(e) => setSubmitForm({ ...submitForm, category: e.target.value })}
                  className="w-full bg-deep border border-main rounded-lg px-4 py-2 text-heading focus:outline-none focus:border-blue-500"
                >
                  <option value="animals">Animals</option>
                  <option value="objects">Objects</option>
                  <option value="people">People</option>
                  <option value="nature">Nature</option>
                  <option value="abstract">Abstract</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-heading mb-2 text-sm">Description (optional)</label>
                <textarea
                  value={submitForm.description}
                  onChange={(e) => setSubmitForm({ ...submitForm, description: e.target.value })}
                  placeholder="Tell us about your design..."
                  rows="3"
                  className="w-full bg-deep border border-main rounded-lg px-4 py-2 text-heading placeholder:text-muted focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Submit Design
                </button>
                <button
                  onClick={() => {
                    setShowSubmitModal(false);
                    setSubmitForm({ name: '', category: 'animals', description: '' });
                  }}
                  className="flex-1 bg-transparent border border-tag text-body py-3 rounded-lg font-medium hover:border-body hover:text-heading transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSaveWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-light text-heading mb-4">Save Your Design?</h2>
            <p className="text-body mb-6">
              {pendingPreset === 'custom' 
                ? 'You have an unsaved custom design. Would you like to save it before starting a new design?'
                : 'You have an unsaved custom design. Would you like to save it before switching to a different example?'}
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => handleSaveAndSwitch('png')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Save as PNG & Continue
              </button>
              <button
                onClick={() => handleSaveAndSwitch('dots')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Export Dots & Continue
              </button>
              <button
                onClick={handleDiscardAndSwitch}
                className="w-full bg-transparent border border-orange-500 text-orange-400 py-3 rounded-lg font-medium hover:bg-orange-500 hover:bg-opacity-10 transition-colors"
              >
                Discard & Continue
              </button>
              <button
                onClick={handleCancelSwitch}
                className="w-full bg-transparent border border-tag text-body py-3 rounded-lg font-medium hover:border-body hover:text-heading transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RivetMapper;