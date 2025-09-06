import * as sharp from 'sharp';
export declare const inputFolder = './disk';
export declare const outputFolder = './processed';
export declare const imageProcessing: (
  width: number,
  height: number,
  fileName: string
) => Promise<sharp.OutputInfo>;
//# sourceMappingURL=resize.d.ts.map
