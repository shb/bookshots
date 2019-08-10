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

  addons.register('shb/storybook-storyshots', createAddon(provider));
}

function initProvider (options) {
  const Provider = providers[options.provider.type]
  const providerOptions = options.provider.options
  return new Provider(providerOptions)
}

const createAddon = provider => function storyshotsAddon(api)
{
  let report
  let stories

  api.on(SET_STORIES, event => {
    stories = event.stories
    updateUi()
  })

  provider.onNewReport = () => {
    report = new JestReport(provider)
    updateUi()
  }

  function updateUi () {
    if (!stories) return
    if (!report) return
    report.load()
    const deco = new StoryDecorator(report)
    Object.values(stories).forEach(story => {
      deco.addStoryBadges(story)
    })
    deco.setBadges()
  }

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

  const getFailed = story => report
    ? report.queryAssertions()
      .filterStory(story)
      .filterFailed()
      .getResults()
    : []
}
