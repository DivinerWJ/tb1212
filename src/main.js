/*
 * @Description: 某宝双十二快乐器
 * @Version: 1.0.0
 * @Autor: DivinerWJ
 * @Date: 2020-12-03 15:00:21
 * @LastEditors: DivinerWJ
 * @LastEditTime: 2020-12-04 02:29:44
 * @FilePath: \AutoJs\tb1212\main.js
 */

// 版本号
version = '1.0.0'

toast('请确保已打开Auto.js无障碍服务，以便脚本正常工作')
// 检查无障碍服务是否已经启用，如果没有启用则跳转到无障碍服务启用界面，并等待无障碍服务启动；当无障碍服务启动后脚本会继续运行。
auto.waitFor()

var width = device.width // 获取设备的宽度
var height = device.height // 获取设备的高度

/**
 * @description: 判断页面是否有可操作的控件
 * @param {String} str 字符串
 * @return {Boolean} 是否存在
 * @author: DivinerWJ
 */
const isExists = (str) => {
  return descContains(str).exists() || textContains(str).exists()
}

/**
 * @description: 打开活动页面
 * @param {String} active
 * @return {none} none
 * @author: DivinerWJ
 */
const waitFunc = (active) => {
  while (true) {
    if (active === currentActivity()) {
      break
    }
    sleep(1000)
  }
}

/**
 * @description: 等待完成文字/按钮出现
 * @param {String} text
 * @return {none} none
 * @author: DivinerWJ
 */
const waitText = (text) => {
  while (true) {
    if (textContains(text).waitFor()) {
      break
    }
    sleep(1000)
  }
}

// 开始运行
function run() {
  console.show()
  console.setPosition(0, 1000)
  sleep(1000)
  console.setSize(width / 1.5, height / 3)
  // setScreenMetrics(width, height);
  log('开始运行')
  log('正在启动淘宝APP')
  launchApp('手机淘宝')
  while (true) {
    if (currentPackage() === 'com.taobao.taobao') {
      log('淘宝启动成功')
      app.startActivity({
        action: 'android.intent.action.VIEW',
        packageName: 'com.taobao.taobao',
        className: 'com.taobao.search.searchdoor.SearchDoorActivity'
        // data: '',
        // className: 'com.taobao.browser.BrowserActivity'
      })
      waitFunc('com.taobao.search.searchdoor.SearchDoorActivity')
      setText('欢乐造红包')
      textContains('搜索').clickable().click();
      waitFunc('com.taobao.browser.BrowserActivity')
      log('活动页面打开成功')
      break
    }
    sleep(1000)
  }
  start()
}
// 任务开始
function start() {
  textContains('领欢乐币').waitFor()
  textContains('领欢乐币').clickable().click()
  sleep(1500)
  if (isExists('去打卡')) {
    console.info('去打卡')
    textContains('去打卡').click()
  }
  sleep(1500)
  var title = ['去完成']
  for (var i = 0; i < title.length; i++) {
    num = 1
    j = 0
    while (true) {
      var flag = isExists(title[i])
      toast('[' + title[i] + ']返回值为：' + flag)
      if (text(title[i]).findOnce(j) != null) {
        console.info('第' + num + '次' + title[i])
        num++
        textContains(title[i]).findOnce(j).click()
        // goto(title[i])
        while (true) {
          sleep(random(6500, 8500))
          if (textContains('开通即享').exists()) {
            log('跳过开通任务')
            j++
            back()
            break
          }
          if (textContains('很抱歉，本次活动为邀请制').exists()) {
            log('跳过本次任务')
            j++
            back()
            break
          }
          if (textContains('复制链接').exists()) {
            log('跳过分享任务')
            j++
            back()
            sleep(1500)
            back()
            break
          }
          if (textContains('点击施肥').exists()) {
            log('跳过施肥任务')
            j++
            back()
            break
          }
          if (descContains('流量').exists()) {
            log('跳过充值任务')
            j++
            back()
            break
          }
          if (textContains('开通连续包月').exists()) {
            log('跳过开通连续包月任务')
            j++
            back()
            sleep(1500)
            textContains('忍痛离开').click() || textContains('收下去逛逛').click()
            break
          }
          if (textContains('淘宝特价版送红包').exists()) {
            log('跳过打开APP任务')
            j++
            back()
            break
          }
          if (textContains('轻点照亮').exists() || textContains('垃圾分类').exists()) {
            log('跳过拍立淘任务')
            j++
            back()
            break
          }
          if (textContains('开通88VIP').exists()) {
            log('跳过开通88VIP任务')
            j++
            back()
            break
          }
          if (textContains('消除三次').exists()) {
            log('跳过游戏任务')
            j++
            back()
            break
          }
          if (textContains('浏览').exists() || descContains('浏览').exists()) {
            sleep(17000)
            // ['任务完成', '任务已完成', '任务已经全部完成啦']
            if (isExists(/任务[\s\S]*完成/)) {
              toast('浏览完成')
              back()
              break
            }
          } else {
            back()
            break
          }
        }
      } else {
        break
      }
      sleep(3000)
    }
  }
  // 立即领取任务
  count = 3
  while (text('立即领取').exists()) {
    text('立即领取').findOne().click()
    sleep(1500)
    count--
    if (count < 0) {
      break
    }
  }
  console.info('脚本结束')
  sleep(500)
  console.hide()
  exit()
}

// 开始执行run
// alert('【淘宝双十二活动脚本' + version + '】\n\n脚本执行过程请勿手动点击屏幕，否则脚本执行可能会错乱，导致任务失败\n执行过程中可按音量+键终止\n\n执行淘宝任务时请确保使用低版本淘宝（V9.0.0及以下），否则无法获取奖励\n\n最新版脚本请到GitHub获取\nhttps://github.com/YBQ789/taobao-1212\n\nPowered By YBQ789');
run()
// alert('任务已完成！');
