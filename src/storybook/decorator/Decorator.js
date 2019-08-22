import Decoration from "./Decoration"
import StoryHelper from './StoryHelper'

export default class Decorator
{
  constructor (options) {
    this.mapper = undefined
    Object.assign(this, options || {})
    this.color = 'red'
    this.counters = []
  }

  flagStory (story) {
    const id = story.id
    this.mapper.set(this.getSelector(id), new Decoration('bullet', {
      color: this.color
    }))

    this.flagStoryParents (story)
  }

  unflagStory (story) {
    const id = story.id
    this.mapper.delete(this.getSelector(id))

    this.unflagStoryParents(story)
  }

  flagStoryParents (story) {
    const parents = StoryHelper.getParentIds(story)
    parents.forEach(pid => {
      const count = this.incrementCounter(pid)
      this.mapper.set(this.getSelector(pid), new Decoration('badge', {
        color: this.color,
        content: count
      }))
    })
  }

  unflagStoryParents (story) {
    const parents = StoryHelper.getParentIds(story)
    parents.forEach(pid => {
      const count = this.decrementCounter(pid)
      if (count <= 0) {
        this.mapper.delete(this.getSelector(pid))
      } else {
        this.mapper.set(this.getSelector(pid), new Decoration('badge', {
          color: this.color,
          content: count
        }))
      }
    })
  }

  incrementCounter (id) {
    if (!(id in this.counters)) this.counters[id] = 0
    this.counters[id] ++
    return this.counters[id]
  }

  decrementCounter (id) {
    if (!(id in this.counters)) return 0
    this.counters[id] --
    if (this.counters[id] < 0 ) this.counters[id] = 0
    return this.counters[id]
  }

  getSelector (id) {
    return `#${id}:after`
  }
}
