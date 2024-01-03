export default function uriToBlob(uri) {
  var byteString;
  if (uri.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(uri.split(',')[1]);
  else byteString = unescape(uri.split(',')[1]);

  var mimeString = uri.split(',')[0].split(':')[1].split(';')[0];

  var raw = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    raw[i] = byteString.charCodeAt(i);
  }

  return new Blob([raw], { type: mimeString });
}
