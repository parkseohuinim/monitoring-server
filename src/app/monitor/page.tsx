'use client'

import { useMemo } from "react"
import VerticalBar from "../components/chart/VerticalBar"

export default function Monitor2({
}) {
  const data = useMemo(() => {
    return {
      title: '가장 맛있는 음식',
      unit: '명',
      chartData: [
        {
          label :'참치',
          amount :32,
        },
        {
          label :'피자',
          amount :65,
        },
        {
          label :'국밥',
          amount :84,
        },
        {
          label :'크림 파스타',
          amount :91,
        },
        {
          label :'토마토 파스타',
          amount :12,
        },
        {
          label :'연어초밥',
          amount :1,
        },
        {
          label :'참치 회',
          amount :25,
        },
        {
          label :'제육볶음',
          amount :1,
        },
        {
          label :'부대찌개',
          amount :4,
        },
        {
          label :'샐러드',
          amount :0,
        },
        {
          label :'과일',
          amount :9,
        },
      ]
    }
  }, [])
  return (
    <div style={{background: '#353535', paddingTop: 40}}>
      <div className="mt-40">
        <VerticalBar data={data} />
      </div>

      <div className="mt-40">
        <VerticalBar data={data} />
      </div>

      <div className="mt-40">
        <VerticalBar data={data} />
      </div>
    </div>
  )
}