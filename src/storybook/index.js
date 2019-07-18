import React from 'react'
import addons, { types } from '@storybook/addons'
import { SET_STORIES } from '@storybook/core-events'

import JestReport from './JestReport'
import StoryDecorator from './StoriesDecorator';
import StoryshotPanel from './components/StoryshotsPanel';
import StoryshotStatus from './components/StoryshotStatus';
import providers from './providers'

export default function (options) {
  const provider = initProvider(options)
  const report = new JestReport(provider)

  addons.register('shb/storybook-storyshots', createAddon(report));
}

function initProvider (options) {
  const providerCtor = providers[options.provider.type]
  const providerOptions = options.provider.options
  return new providerCtor(providerOptions)
}

const createAddon = report => function storyshotsAddon(api) {

  const deco = new StoryDecorator(report)

  api.on(SET_STORIES, ({stories}) => {
    report.load()
    deco.reset(report)
    Object.values(stories).forEach(story => {
      deco.addStoryBadges(story)
    })
    deco.setBadges()
  })

  addons.add('shb/storybook-storyshots/panel', {
    type: types.PANEL,
    title: () => {
      const story = api.getCurrentStoryData()
      return story ? <StoryshotStatus results={getFailed(story)}>Storyshots</StoryshotStatus> : null
    },
    render: ({ active }) => {
      const story = api.getCurrentStoryData()
      return active ? <StoryshotPanel results={getFailed(story)} /> : null
    },
  })

  const getFailed = story => report.queryAssertions()
    .filterStory(story)
    .filterFailed()
    .getResults()
}
