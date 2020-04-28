declare module "read-file-utf8" {

    function readFile(path: string): Promise<string>;

    export = readFile;
}
