export function createDependencyProposals(range: any, monaco: any) {
  return [
    {
      label: 'khai báo',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'khai báo',
      range: range
    },
    {
      label: 'hàm',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'hàm',
      range: range
    },
    {
      label: 'trả về',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'trả về',
      range: range
    }
  ]
}
