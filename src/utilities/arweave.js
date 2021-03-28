import Arweave from 'arweave'

export const arweave = Arweave.init({
  host: 'arweave.net', // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: 'https', // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging
})

export const generateWallet = async () => {
  const wallet = await arweave.wallets.generate()
  saveTemplateAsFile('ArcadeCityKey.json', JSON.stringify(wallet))
  return wallet
}

export const generateKey = async () => {
  return await arweave.wallets.generate()
}

const saveTemplateAsFile = (filename, jsonToWrite) => {
  const blob = new Blob([jsonToWrite], { type: 'text/json' })
  const link = document.createElement('a')

  link.download = filename
  link.href = window.URL.createObjectURL(blob)
  link.dataset.downloadurl = ['text/json', link.download, link.href].join(':')

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })

  link.dispatchEvent(evt)
}
