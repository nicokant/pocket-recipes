import { TrixEditor, MergeTags } from "react-trix";
import "trix/dist/trix.esm";
import "trix/dist/trix.css";

type Props = {
  value: string,
  onChange: (updater: string) => void,
  onEditorReady?: () => void,
}

const MERGE: MergeTags[] = []

export default function TEditor({ value, onChange, onEditorReady }: Props) {
  return <TrixEditor value={value} onChange={onChange} onEditorReady={onEditorReady} mergeTags={MERGE} />
}