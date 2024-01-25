'use client'
import Datafeed from './datafeed'
import { TradingView } from '../../_library/charting_library/charting_library.standalone'
import { useEffect } from 'react'
import { Box, useTheme } from '@mui/material'

interface MyWindow extends Window {
  myFunction(): void
  tvWidget: any
}

declare var window: MyWindow

const tvWidget: any = TradingView

export default function TradingviewChart () {
  const theme: any = useTheme()

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/jsx'
    script.src = '/public/charting_library/charting_library.js'

    document.head.appendChild(script)

    var widget = (window.tvWidget = new tvWidget.widget({
      container: 'tv_chart_container',
      datafeed: Datafeed,
      library_path: '/charting_library/',
      autosize: true,
      symbol: 'FUWANGFOOD',
      interval: '1D',
      timezone: 'Asia/Dhaka',
      theme: theme.palette.mode,
      locale: 'en',
      header_widget_buttons_mode: 'fullsize',
      loading_screen: {
        backgroundColor: theme.palette.background.default,
        foregroundColor: theme.palette.primary.main
      },
      enabled_features: ['study_templates', 'chart_template_storage']
      // overrides: {
      //   'paneProperties.background': '#fff',
      //   'paneProperties.backgroundType': 'solid'
      // }
    }))

    // widget.onChartReady(() => {
    //   widget
    //     .activeChart()
    //     .createStudy('Moving Average', false, false, { length: 5 })
    // })

    return () => script.remove()
  }, [])

  return (
    <Box
      component='div'
      id='tv_chart_container'
      sx={{
        maxWidth: { xs: '100vw', sm: '1290px' },
        height: 600,
        mx: 'auto',
        py: 2,
        px: 2
      }}
    ></Box>
  )
}
