# showSaveFilePicker
@see https://wicg.github.io/file-system-access/#api-filesystemwritablefilestream

@see https://stackoverflow.com/questions/62883650/streaming-a-client-side-generated-response-as-a-download-without-service-worker

```js
// 2022/2/26 chrome browser is working.
onclick = async () => {

if( !("showSaveFilePicker" in self) ) {
  throw new Error( "unsupported browser" );
}

const handle = await showSaveFilePicker();
const filestream = await handle.createWritable();
const writer = await filestream.getWriter();
// here we have a WritableStream, with direct access to the user's disk
await writer.write( "hello" );
await writer.write( " world" );
writer.close();

};
```