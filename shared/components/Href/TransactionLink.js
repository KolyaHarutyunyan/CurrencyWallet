import React from 'react'

import Href from 'components/Href/Href'
import config from 'app-config'

export default ({ type, id, link = '#' }) => {
  switch (type) {
    case 'BTC':
      link = `${config.api.blocktrail}/tx/${id}`

    case 'ETH':
      link = `${config.link.etherscan}/tx/${id}`

    case 'EOS':
      link = `${config.link.eos}/#tx/${id}`
  }

  return (
    <div>
      Transaction: <strong><Href tab={link} rel="noopener noreferrer">{id}</Href></strong>
    </div>
  )
}