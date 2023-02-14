// @ts-ignore
import * as Pako from 'pako';

export const parseActivities = async (file:File) => {

        if (typeof window !== 'undefined') {
            const fileArrayBuffer = await fileToArrayBuffer(file);
            const unzip = Pako.ungzip(fileArrayBuffer);
            // @ts-ignore
            import('js-untar').then(async (module) => { // dynamic import because importing the module on the server-side will result in a exception becasue the module is looking for the window attribute
                const untar = module.default;

                untar(unzip.buffer).progress((extractedFile: any) => {
                    console.log(extractedFile);
                })
            });
        }
        
};

function fileToArrayBuffer(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
  