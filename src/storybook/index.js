import React from 'react'
import addons, { types } from '@storybook/addons'
import { SET_STORIES } from '@storybook/core-events'

import JestReport from './JestReport'
import StoryshotPanel from './components/StoryshotsPanel'
import StoryshotTab from './components/StoryshotStatus'
import providers from './providers'

import { addStylesheet } from './cssomHelper'
import CssRuleMapper from './decorator/CssRuleMapper'
import Decorator from './decorator/Decorator'

export default function (options) {
  const provider = initProvider(options)

  addons.register('shb/storybook-storyshots', createAddon(provider))
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

  const stylesheet = addStylesheet("bookshots")
  const cssMapper = new CssRuleMapper({
    stylesheet
  })
  const deco = new Decorator({
    mapper: cssMapper
  })

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
    Object.values(stories).forEach(story => {
      if (getFailed(story).length) {
        deco.flagStory(story)
      } else {
        deco.unflagStory(story)
      }
    })
  }

  addons.add('shb/storybook-storyshots/panel', {
    type: types.PANEL,
    title: () => {
      const story = api.getCurrentStoryData()
      return story ? <StoryshotTab results={getFailed(story)}>Storyshots</StoryshotTab> : null
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
