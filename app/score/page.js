"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Score() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const search = searchParams.get("id") || "123456"
  const [title, setTitle] = useState("Match Name...")
  const [score, setScore] = useState("Live Score Data...")
  const [batsman, setBatsman] = useState("Batsman Data...")
  const [batsmanrun, setBatsmanrun] = useState("")
  const [bowler, setBowler] = useState("")
  const [bowlerruns, setBowlerruns] = useState("")
  const [bowlerover, setBowlerover] = useState("")
  const [bowlerwickets, setBowlerwickets] = useState("")
  const [runrate, setRunrate] = useState("Fetching Run rate")
  const [update, setUpdate] = useState("match Update")
  const fetchWord = async () => {
    const response = await fetch("/match/" + search)
    const data = await response.json()
    setTitle(data.title)
    setScore(data.current)
    setBatsman(data.batsman)
    setBatsmanrun(data.batsmanrun)
    setBowler(data.bowler)
    setBowlerover(data.bowlerover)
    setBowlerruns(data.bowlerruns)
    setBowlerwickets(data.bowlerwickets)
    setRunrate(data.runrate)
    setUpdate(data.update)
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/match/" + search)
      const data = await response.json()
      if (response.status == 200) {
        console.log("Data Fetched...")
      } else {
        push(search)
      }
    }
    fetchData()
    fetchWord()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let Displayscore
  if (batsman === "Data Not Found") {
    Displayscore = (
      <p className="text-gray-800 dark:text-gray-100 text-sm">
        {"🏏 " + title}
        <br /> <br />
        {"📊 " + update}
      </p>
    )
  } else {
    Displayscore = (
      <p className="text-gray-800 dark:text-gray-100 text-sm">
        {"🏏 " + title}
        <br />
        <br /> {"📊 " + update}
        <br />
        <br /> {"🔴 " + score}
        <br />
        <br /> {"🏏 " + batsman} {batsmanrun}
        <br />
        <br />{" "}
        {"🥎 " +
          bowler +
          "\t" +
          bowlerover +
          " over " +
          bowlerruns +
          " Runs and " +
          bowlerwickets +
          " wicket"}
        <br />
        <br /> {"📉 " + runrate}
      </p>
    )
  }
  let Displaybutton
  if (batsman === "Data Not Found") {
    Displaybutton = ""
  } else {
    Displaybutton = (
      <button
        className="bg-green-400 text-black font-medium py-2 px-4 rounded-full mt-4 border shadow-md"
        type="button"
        onClick={() => fetchWord()}
      >
        Refresh ▶
      </button>
    )
  }
  return (
    <div className="min-h-screen bg-current dark:bg-current">
      <div className="container mx-auto px-4">
        <div className="flex h-screen flex-col justify-center items-center">
          <div className="flex items-center justify-center">
            <form method="GET" className="m-3 flex">
              <input
                id="id"
                name="id"
                method="GET"
                className="w-15 text-center rounded-l-lg p-0 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                placeholder="Match ID"
                autoComplete="off"
                maxLength="30"
                required
              />
              <button className="w-15 px-4 rounded-r-lg bg-purple-400 text-gray-800 font-bold p-4 uppercase border-purple-500 border-t border-b border-r">
                GET
              </button>
            </form>
          </div>
          <div className="dark:bg-pink-200 dark:border-pink-200 bg-pink-200 rounded-2xl border shadow-xl p-10 max-w-lg mt-6">
            <div className="w-full flex flex-col justify-between dark:bg-gray-800 bg-blue-300 dark:border-gray-700 rounded-lg border border-blue-400 mb-6 py-5 px-4">
              {Displayscore}
            </div>
            <div className="flex items-center justify-center">
              &nbsp;
              {Displaybutton}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
