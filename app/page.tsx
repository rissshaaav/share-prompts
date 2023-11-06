import Feed from '@components/Feed'
import React from 'react'

const page = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
            <br className="min-md:hidden" />
            <span className="orange_gradient text-center">
                AI Powered Prompts
            </span>
            <p className='desc text-center'>
                Promptopia is an open source prompting tool for modern world to discover, create and share creative prompts.
            </p>
        </h1>
        <Feed/>
    </section>
  )
}

export default page
