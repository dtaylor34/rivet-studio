# Version Control Guide

## Branching Strategy

This project uses a version-based branching strategy for major releases.

### Branch Structure

```
master (main branch - stable production code)
├── v1.0 (first major release)
├── v2.0 (second major release - site ordering changes)
├── v3.0 (future major release)
└── ...
```

### Version Branches

Each major version gets its own branch with specific improvements and features:

- **v1.0** - Initial portfolio launch with core components and project showcases
- **v2.0** - Site ordering improvements and content reorganization
- **v3.0** - (Future) TBD

### Workflow

1. **Starting a new version:**
   ```bash
   git checkout master
   git pull origin master
   git checkout -b v[X.0]
   ```

2. **Making changes:**
   - Work on your feature/changes in the version branch
   - Commit regularly with descriptive messages
   - Update CHANGELOG.md with your changes

3. **Preparing for release:**
   - Update CHANGELOG.md with release date and finalized changes
   - Test thoroughly
   - Commit all changes

4. **Publishing the version:**
   ```bash
   git push -u origin v[X.0]
   ```

5. **Merging to master (when ready for production):**
   ```bash
   git checkout master
   git merge v[X.0]
   git push origin master
   ```

6. **Building and deploying:**
   ```bash
   npm run build
   # Then upload to FTP server
   ```

### Best Practices

- **Major versions (v1.0, v2.0, v3.0):** Use for significant changes, new features, or major redesigns
- **Always update CHANGELOG.md** when creating or updating a version branch
- **Keep master stable:** Only merge version branches after thorough testing
- **Descriptive commits:** Write clear commit messages explaining what changed and why
- **Document everything:** Update CHANGELOG.md and this guide as needed

### Current Version

**Latest Stable:** v1.0  
**Current Release:** v3.0 (Site ordering and navigation improvements)

### Quick Reference

| Branch | Status | Description |
|--------|--------|-------------|
| master | Stable | Production-ready code |
| v1.0   | Released | Initial portfolio with all core features |
| v2.0   | Released (v3.0) | Site ordering and content reorganization |






