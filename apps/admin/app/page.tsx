import { gDriveApi } from "../utils/api";

export default async function Home() {
  //  const { files } = await GetFiles({})
  //  const match = files.filter(file => file.encryptedId === '91b93cd152bbb8d59b28dd804312cf61074dc65722534d2e377210adc95909685810937fd8e76bb9503a8b85b159b69c')
  //  const id = await decryptData(match[0]?.encryptedId!, process.env.ENCRYPTION_KEY)
  //  console.log({ files })
  const { files } = await gDriveApi.getDirectoryList(
    process.env.ROOT_FOLDER_ID!,
  );
  if (!files) return <p>No files Found</p>;
  return (
    <main>
      {files.map((file, i) => (
        <div key={`file-${i}`}>
          <p>{file.name}</p>
          <p>{file.modifiedTime}</p>
        </div>
      ))}
    </main>
  );
}
