export default function PageContainer({ title, children }) {
  return (
    <div className="p-10 max-w-3xl mx-auto">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">

        <h1 className="text-2xl font-bold mb-6 text-center uppercase">
          {title}
        </h1>

        {children}

      </div>
    </div>
  )
}