import { useLogStore } from "@/stores/logStore"
import { useEffect, useRef } from "react"

export const LogsWindow: React.FC = () => {
    const { logs } = useLogStore()
    const logEndRef = useRef<HTMLDivElement>(null)
  
    useEffect(() => {
      logEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [logs])

    if (logs.length === 0){
        return null;
    }
  
    return (
        <div className=" w-90 h-64 bg-gray-800 rounded-lg shadow-lg overflow-hidden p-4 pointer-events-auto text-sm text-gray-300 font-mono">
          <div className="h-full overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="mb-2">
                <span className="text-gray-500">
                  [{new Date().toLocaleTimeString()}]
                </span>{" "}
                {log}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      );
  }
  
  