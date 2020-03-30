import className from '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'QIUJUN'
    }
  },
  render () {
    // 由于在webpack配置中打开了cssModule(见vue-style-loader配置)，所以此处id从footer改成了className.footer
    // 更加方便直观
    return (
      <div id={className.footer}>
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
