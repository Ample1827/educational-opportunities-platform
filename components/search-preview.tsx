"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import Link from "next/link"

export function SearchPreview() {
  const [searchTab, setSearchTab] = useState<"university" | "state">("university")
  const [universities, setUniversities] = useState<string[]>([])
  const [states, setStates] = useState<string[]>([])
  const [selectedUniversity, setSelectedUniversity] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [loading, setLoading] = useState(true)

  // Fetch universities and states from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [universitiesRes, statesRes] = await Promise.all([
          fetch('/api/filters?type=universidades'),
          fetch('/api/filters?type=estados')
        ])
        
        const universitiesData = await universitiesRes.json()
        const statesData = await statesRes.json()
        
        if (universitiesData.success) {
          setUniversities(universitiesData.data)
        }
        if (statesData.success) {
          setStates(statesData.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = () => {
    if (searchTab === "university" && selectedUniversity) {
      window.location.href = `/search?universidad=${encodeURIComponent(selectedUniversity)}`
    } else if (searchTab === "state" && selectedState) {
      window.location.href = `/search?estado=${encodeURIComponent(selectedState)}`
    }
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Encuentra tu programa ideal
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Busca por universidad o por estado para descubrir los programas disponibles
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
            {/* Tab Buttons */}
            <div className="flex gap-3 mb-6 bg-gray-100 p-1.5 rounded-xl">
              <button
                onClick={() => setSearchTab("university")}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  searchTab === "university"
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Por Universidad
              </button>
              <button
                onClick={() => setSearchTab("state")}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  searchTab === "state"
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Por Estado
              </button>
            </div>

            {/* Search Content */}
            <div className="space-y-4">
              {searchTab === "university" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selecciona una universidad
                    </label>
                    <select
                      value={selectedUniversity}
                      onChange={(e) => setSelectedUniversity(e.target.value)}
                      disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {loading ? "Cargando..." : "Selecciona una universidad"}
                      </option>
                      {universities.map((uni) => (
                        <option key={uni} value={uni}>
                          {uni}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={!selectedUniversity || loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Search className="w-5 h-5" />
                    Buscar programas
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selecciona un estado
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {loading ? "Cargando..." : "Selecciona un estado"}
                      </option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={!selectedState || loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Search className="w-5 h-5" />
                    Buscar programas
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          
        </div>
      </div>
    </section>
  )
}
