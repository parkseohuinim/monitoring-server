'use client'

import Tooltip from '@/app/components/Tooltip'
import { useEffect, useMemo, useState } from "react"
import {ChartData, BarData} from '@/app/types/chartdata'

type Data = {
  data?: {
  title?: string | undefined,
  unit?: string | undefined,
  chartData: ChartData[],
  },
  background?: string | undefined
}
export default function VerticalBar({data = {
  title: '타이틀',
  unit: '%',
  chartData: [
    {
      label :'참치',
      amount :0,
    },
  ]}, background = '#000'
}: Data) {
  const style = useMemo(() => {
    return `
    
    `
  }, [])

  type FilteredData = {
    title: string | undefined,
    unit: string | undefined,
    chartData: BarData[]
  }
  const [barData, setBarData]:[FilteredData, Function] = useState({
    title: '타이틀',
    unit: '%',
    chartData: [
    {
      label :'참치',
      amount :0,
      height: '0%',
      tooltipActive: false,
    },
  ]})

  // 마우스 행동
  function handleMouseOver(i:number) {
    const data = JSON.parse(JSON.stringify(barData))
    if(data.chartData[i]) {
      data.chartData[i].tooltipActive = true
      setBarData(data)
    }
  }
  function handleMouseOut() {
    const data = JSON.parse(JSON.stringify(barData))
    data.chartData.forEach((e:BarData) => {
      if(e.tooltipActive) e.tooltipActive = false
    })
    setBarData(data)
  }
  const [load, setLoad]:[boolean, Function] = useState(false)
  useEffect(() => {
    if(data.chartData.length) {
      const newChartData = {...data, chartData: data.chartData.map((e,i,arr) => {
        return {...e, tooltipActive: false, height: '0%'}
      })}
      setBarData(newChartData)
      setLoad(true)
    }
  }, [data])
  useEffect(() => {
    if(load) {
      const totalAmount = data.chartData.reduce((acc,e) => {
        if(e.amount && e.amount > acc) return e.amount
        else return acc
      }, 0)
      const newChartData = {...data, chartData: data.chartData.map((e,i,arr) => {
        return e.amount ? {...e, height: (e.amount / totalAmount * 100) + '%'} : {...e, height: '0%'}
      })}
      setBarData(newChartData)
    }
  }, [load])
  return (
    <>
      <style>{style}</style>
      <section className="vertical-bar-section" style={{opacity: load ? 1 : 0}}>
        <div className="vertical-bar-wrap" style={{background: background}}>
          <div>
            <h2 className='t-30'>{barData.title}
            <span className='t-15 ml-15'>단위: {barData.unit}</span>
            </h2>
            
          </div>
          
          <div className="vertical-bar">
            {
              barData.chartData.length &&
              barData.chartData.map((e,i,arr) => {
                return (
                  <div className="bar-wrap" 
                  key={'barData' + i}
                  onMouseOver={() => handleMouseOver(i)}
                  onMouseOut={handleMouseOut}>
                    <div className="bar" 
                    style={{height: e.height}}
                    >
                      <Tooltip msg={`${e.label}: ${e.amount}`} active={e.tooltipActive} />
                    </div>
                    {/* <div className="bar-tooltip tooltip">
                      <p>{e.label}</p>
                    </div> */}
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </>
  )
}