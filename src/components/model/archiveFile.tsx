export interface ArchiveFile {
    buffer : ArrayBuffer,
    blob : Blob,
    type : string,
    name : string,
    namePrefix : string,
    uname : string,
    uid: number,
    ustarFromat: string,
    version : string,
    checksum : number
}