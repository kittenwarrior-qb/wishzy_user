'use client'

import { useTest } from "@/store/slices/useTest"

export default function Test() {
      const increasePopulation = useTest((state) => state.increasePopulation)
       const bears = useTest((state) => state.bears)

    return (
        <>
        <h1>{bears} bears around here...</h1>
        <button onClick={increasePopulation}>one up</button>
        </>
    )
} 