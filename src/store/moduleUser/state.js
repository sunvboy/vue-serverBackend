import { CONFIG_ACCESS_TOKEN } from '../../constants'

export default  {
    currentUser: null,
    user: {},
    [CONFIG_ACCESS_TOKEN]: localStorage.getItem(CONFIG_ACCESS_TOKEN),
    posts: {}
}