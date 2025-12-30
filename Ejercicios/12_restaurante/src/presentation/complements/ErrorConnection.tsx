
export function ErrorConnection(){
    return(
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md rounded-lg border border-red-300 bg-red-50 p-6 text-center shadow-sm">
        <h2 className="mb-2 text-lg font-semibold text-red-700">
          Error de conexión
        </h2>

        <p className="mb-4 text-sm text-red-600">
          Fallo en la conexión, intentelo de nuevo más tarde
        </p>
      </div>
    </div>
    )
}