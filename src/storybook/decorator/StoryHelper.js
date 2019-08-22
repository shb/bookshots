export default class StoryHelper
{
  static getParentIds(story) {
    /* We ought to do this:

      My App/Buttons/Simple
        v       v      v
      my-app buttons simple
        v       v      v
      my-app    v      v
      my-app-buttons   v
      my-app-buttons-simple

    */
    const parents = story.kind
      .split('/')
      .map(StoryHelper.sanitize)
    const fullParents = []
    parents.reduce((acc, parent) => {
      fullParents.push([...acc, parent])
      return [...acc, parent]
    }, [])
    return fullParents.map(it => it.join('-'))
  }

  static sanitize (str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/, '-')
  }
}