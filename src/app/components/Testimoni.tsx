import React from 'react'

type Props = {}

function Testimoni({}: Props) {
  return (
    <>
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 px-4">
  <div className="max-w-7xl mx-auto text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
      Testimoni <br /> apa kata mereka.
    </h1>
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
      Real feedback from people who use our platform.
    </p>

    <div className="flex justify-center mb-12">
      <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 mx-1"></span>
      <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 mx-1"></span>
      <span className="inline-block w-40 h-1 rounded-full bg-indigo-500 mx-1"></span>
      <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 mx-1"></span>
      <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 mx-1"></span>
    </div>

    <div className="grid md:grid-cols-3 gap-8 px-4">
      {[
        { name: "Kenzie Edgar", img: 1 },
        { name: "Stevie Tifft", img: 2 },
        { name: "Tommie Ewart", img: 3 },
        { name: "Charlie Howse", img: 4 },
        { name: "Nevada Herbertson", img: 5 },
        { name: "Kris Stanton", img: 6 },
      ].map((user, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
              <img
                src={`https://i.pravatar.cc/100?img=${user.img}`}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3 text-left">
              <h6 className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                {user.name}
              </h6>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="text-xl text-indigo-400">“</span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sunt
            ratione dolor exercitationem minima quas itaque saepe quasi
            architecto vel!
            <span className="text-xl text-indigo-400">”</span>
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
    </>
  )
}

export default Testimoni