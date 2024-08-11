import HeroBanner from "@repo/ui/components/storefront/hero-banner";
import FormHome from "../components/form-home/form-home";
import { FormHomeProvider, ZodFormHome } from "../components/form-home/form-home-context";
import PreviewPanel from "../components/preview-panel";
import HomePreviewWrapper from '../components/form-home/home-preview-wrapper';
import { GetCategories, GetFileContent, UpdateFileContent } from '../../../actions';
import { gDriveApi } from '../../../utils/api';

export default async function HomePage() {
  const categories = await GetCategories()
  const formHome = await GetFileContent({ file: 'home' })
  return (
    <FormHomeProvider categories={categories} formHome={formHome as ZodFormHome}>
        <PreviewPanel
          Form={<FormHome
            updateFileContent={UpdateFileContent}
          />}
          PreviewComponent={
            <HomePreviewWrapper/>
          }
        />
    </FormHomeProvider>
  );
}
