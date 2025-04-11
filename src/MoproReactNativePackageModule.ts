import { NativeModule, requireNativeModule } from 'expo';

import { MoproReactNativePackageModuleEvents } from './MoproReactNativePackage.types';
import { Result } from './MoproReactNativePackage.types';

declare class MoproReactNativePackageModule extends NativeModule<MoproReactNativePackageModuleEvents> {
  PI: number;
  hello(): string;
  generateCircomProof(zkeyPath: string, circuitInputs: string): Result;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<MoproReactNativePackageModule>('MoproReactNativePackage');
