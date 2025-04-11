import { NativeModule, requireNativeModule } from 'expo';

import { MoproReactNativePackageModuleEvents } from './MoproReactNativePackage.types';

declare class MoproReactNativePackageModule extends NativeModule<MoproReactNativePackageModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<MoproReactNativePackageModule>('MoproReactNativePackage');
