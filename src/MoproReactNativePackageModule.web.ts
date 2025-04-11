import { registerWebModule, NativeModule } from 'expo';

import { MoproReactNativePackageModuleEvents } from './MoproReactNativePackage.types';

class MoproReactNativePackageModule extends NativeModule<MoproReactNativePackageModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(MoproReactNativePackageModule);
