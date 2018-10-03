/** @flow */

// import Source from '../scope/models/source';
// import Scope, { BitObject } from  '../context-classes/Scope';

type RelativePath = {
  sourceRelativePath: string,
  destinationRelativePath: string
};

type FileDependency = {
  id: ComponentId,
  relativePaths: relativePath[]
};

type FileContext = {
  base: string,
  file?: ?Vinyl
};

class File extends Type {
  file: Vinyl;

  constructor(relativePath: string, context: FileContext) {
    super(relativePath);
    this.name = 'file';
    if (context.file) {
      this.file = file;
    } else {
      this.file = _loadFile(relativePath, context);
    }
  }

  getContents(): Vinyl {
    return this.file.contents;
  }

  getDeps() {}

  writeDeps(basePath: ?string) {}

  store(): ModelStore {
    const deps: FileDependency[] = this.getDeps();
    const depsObject = _generateObjectsForDeps(deps);

    const name: string = this._file.basename;
    const relative: string = this._file.relative;
    const object: BitObject = Scope.createObject(this._file.contents);

    return {
      val: {
        name: string,
        relativePath: PathLinux,
        file: Ref('thisFile'),
        dependencies: deps
      },
      files: {
        thisFile: 'content',
        'deps[0]': 'content2',
        'deps[1]': 'content3'
      }
    };
  }

  static loadFromStore(val: ModelStore): File {}

  static validate(filePath): boolean {
    return isPath(filePath);
  }
}

function _loadFile(relativePath: string, context: FileContext): File {
  const fullPath = path.join(context.base, relativePath);
  const file = vinylFile.readSync(fullPath, { base: context.base, cwd: context.base });
  return new File(file);
}