import copy from "clipboard-copy";

export function copyLink (e, setMessage) {
   copy(e.currentTarget.dataset.link).then(() => setMessage('The link has been copied to your clipboard!'))
   setTimeout(() => {
      setMessage('')
   }, 4000)
}