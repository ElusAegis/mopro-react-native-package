import { NativeModule, requireNativeModule } from 'expo';

import {
  MoproReactNativePackageModuleEvents,
  Result,
  CircomProofResult,
} from './MoproReactNativePackage.types';

declare class MoproReactNativePackageModule extends NativeModule<MoproReactNativePackageModuleEvents> {
  PI: number;
  hello(): string;
  generateCircomProof(zkeyPath: string, circuitInputs: string): Result;
  verifyProof(zkeyPath: string, proofResult: CircomProofResult): Promise<boolean>;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<MoproReactNativePackageModule>('MoproReactNativePackage');
