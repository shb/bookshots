import Badges, { badge, bullet } from "./badges/Badges";

export default class StoryDecorator {

  constructor(report) {
    this.badgeHelper = new Badges()
    this.reset(report)
  }

  reset(report) {
    this.report = report
    this.failedPerKind = {}
    this.failedStories = {}
  }

  addStoryBadges(story) {
    const results = this.getUnsuccessfulResults(story)
    if (results.length) {
      this.addFailedStory(story)
    }
  }

  getUnsuccessfulResults(story) {
    return this.report
      .queryAssertions()
      .filterStory(story)
      .filterFailed()
      .getResults()
  }

  addFailedStory(story) {
    this.failedStories[story.id] = story
    story.parent = story.id.split('--')[0]
    if (story.parent in this.failedPerKind) {
      this.failedPerKind[story.parent]++
    } else {
      this.failedPerKind[story.parent] = 1
    }
  }

  setBadges() {
    Object.entries(this.failedPerKind).forEach(([id, count]) => {
      this.badgeHelper.add(id, badge({
        content: count
      }))
    })
    Object.entries(this.failedStories).forEach(([id, story]) => {
      this.badgeHelper.add(id, bullet())
    })
    this.badgeHelper.commit()
  }

}