import React from 'react'
import { FormAboutProvider } from '../components/form-about/form-about-context'
import FormAbout from '../components/form-about/form-about'
import PreviewPanel from '../components/preview-panel'
import { UpdateFileContent } from '../../../actions'
import AboutPreviewWrapper from '../components/form-about/about-preview-wrapper'

export default function AboutPage() {

  return (
    <FormAboutProvider>
        <PreviewPanel
          Form={<FormAbout
            updateFileContent={UpdateFileContent}
          />}
          PreviewComponent={
            <AboutPreviewWrapper/>
          }
        />
    </FormAboutProvider>
  )
}
