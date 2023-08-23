import { SFTPClient } from "./sftp";

export const moveToFtp = async (source: string, destination: string): Promise<boolean> => {
    try {
        const client = new SFTPClient();
        await client.connect({
            host: process.env.FTP_URL,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            port: process.env.FTP_PORT,
        })

        let path = destination.substring(0, destination.lastIndexOf("/"));
        var filename = destination.substring(destination.lastIndexOf('/') + 1);
        await client.uploadFile(source, filename)

        client.disconnect();
        return true
    }
    catch (err) {
        console.log(err)
    }
}

export const downloadFromFtp = async (source: string) => {
    try {
        const client = new SFTPClient();
        await client.connect({
            host: process.env.FTP_URL,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            port: process.env.FTP_PORT,
        });

        let filename = source.substring(source.lastIndexOf('/') + 1);
        filename = 'uploads/' + filename;
        await client.downloadFile(filename, source)
        client.disconnect();
        return filename
    }
    catch (err) {
        console.log(err)
    }
}
