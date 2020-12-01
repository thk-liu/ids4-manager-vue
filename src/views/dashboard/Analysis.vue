<template>
  <div class="page-header-index-wide">
    <div class="dashboard-analysis-statistics">
      <div class="dashboard-analysis-order">
        <div class="dashboard-analysis-order-wait">
          <!-- <img src="../../assets/icons/icon_corpIndex.png" alt="url"> -->
          <div class="icon-img icon-img1"></div>
          <div class="wait-type">{{$t('orderList.confirmOrder')}}</div>
          <span>{{orderBaseData.confirmOrder}}</span>
        </div>
        <div class="dashboard-analysis-order-wait">
          <div class="icon-img icon-img2"></div>
          <div class="wait-type">{{$t('orderList.confirmSaleReturnOrder')}}</div>
          <span>{{orderBaseData.confirmSaleReturnOrder}}</span>
        </div>
        <div class="dashboard-analysis-order-wait">
          <div class="icon-img icon-img3"></div>
          <div class="wait-type">{{$t('orderList.confirmPayment')}}</div>
          <span>{{orderBaseData.confirmPayment}}</span>
        </div>
      </div>
      <div class="dashboard-analysis-overview">
        <a-tabs
          default-active-key="1"
          size="large"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
        >
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div
              class="extra-item"
              @click="rangeSelect(item,index)"
              v-for="(item,index) in rangeTag.list"
              :key="index"
            >
              <a-tag :color="rangeTag.curIndex===index?'#FAAD14':''">{{item.name}}</a-tag>
              <!-- <a :class="{rangeActive:rangeTag.curIndex===index}">{{item.name}}</a> -->
            </div>
            <a-range-picker
              :style="{width: '256px'}"
              :placeholder="[StartDate, EndDate]"
              @change="dateChange"
              :value="pickDate(businessQuery)"
              :class="{rangeActivec:rangeTag.curIndex===4}"
            />
          </div>
          <a-tab-pane
            loading="true"
            :tab="$t('orderList.businessOverview')"
            key="1"
            class="tab-pane-overview"
          >
            <div class="tab-pane-content">
              <div class="order-quantity">
                <div class="amount-detail">
                  <span class="type-col">{{$t('orderList.orderCount')}}</span>
                  <span>{{orderOverviewData.orderCount}}</span>
                </div>
                <div class="amount-detail">
                  <span class="type-col">{{$t('orderList.orderMoney')}}</span>
                  <!-- <span class="number-col">{{orderOverviewData.orderMoney}}</span> -->
                  <div
                    class="number-col"
                  >{{$t('page.currency')}} {{moneyFormat(orderOverviewData.orderMoney)}}</div>
                </div>
              </div>
              <div class="order-quantity">
                <div class="amount-detail">
                  <span class="type-col">{{$t('orderList.deliverCount')}}</span>

                  <span>{{orderOverviewData.deliverCount}}</span>
                </div>
                <div class="amount-detail">
                  <span class="type-col">{{$t('orderList.deliverMoney')}}</span>
                  <span
                    class="number-col"
                  >{{$t('page.currency')}}{{moneyFormat(orderOverviewData.deliverMoney)}}</span>
                </div>
              </div>
              <div class="order-quantity">
                <div class="amount-detail">
                  <span class="type-col">{{$t('orderList.returnCount')}}</span>
                  <span>{{orderOverviewData.returnCount}}</span>
                </div>
                <div class="amount-detail">
                  <span class="type-col">{{$t('orderList.returnMoney')}}</span>
                  <span
                    class="number-col"
                  >{{$t('page.currency')}}{{moneyFormat(orderOverviewData.returnMoney)}}</span>
                </div>
              </div>
            </div>
            <div class="tab-pane-content">
              <div class="order-quantity">
                <div class="amount-detail">
                  <span class="type-col">{{$t('orderList.paymentCount')}}</span>
                  <span>{{orderOverviewData.paymentCount}}</span>
                </div>
                <div class="amount-detail">
                  <span class="type-col">{{$t('orderList.paymentMoney')}}</span>
                  <span
                    class="number-col"
                  >{{$t('page.currency')}}{{ moneyFormat(orderOverviewData.paymentMoney)}}</span>
                </div>
              </div>
              <div class="order-quantity">
                <div class="amount-detail">
                  <span class="type-col">{{$t('orderList.returnCount')}}</span>
                  <span>{{orderOverviewData.returnCount}}</span>
                </div>
                <div class="amount-detail">
                  <span class="type-col">{{$t('orderList.returnMoney')}}</span>
                  <span
                    class="number-col"
                  >{{$t('page.currency')}}{{moneyFormat(orderOverviewData.returnMoney)}}</span>
                </div>
              </div>
              <div class="order-quantity">
                <div class="amount-detail">
                  <span class="type-col">{{$t('orderList.costCount')}}</span>
                  <span></span>
                </div>
                <div class="amount-detail">
                  <span class="type-col">{{$t('page.currency')}}{{$t('orderList.costMoney')}}</span>
                  <span class="number-col"></span>
                </div>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>

    <div style="background:#fff;margin-bottom:20px;">
      <a-tabs
        v-model="staticTabKey"
        @change="staticTab"
        size="large"
        :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
      >
        <div class="extra-wrapper" slot="tabBarExtraContent">
          <div
            class="extra-item"
            @click="rangeStatics(item,index)"
            v-for="(item,index) in statistisTag.list"
            :key="index"
          >
            <a-tag :color="statistisTag.curIndex===index?'#FAAD14':''">{{item.name}}</a-tag>
          </div>
          <a-range-picker
            :style="{width: '256px'}"
            :placeholder="[StartDate, EndDate]"
            :value="pickDate(statistisQuery)"
            @change="dateProduct"
            :class="{rangeActivec:statistisTag.curIndex===4}"
          />
        </div>
        <a-tab-pane :tab="$t('orderList.orderStatistics')" key="order"></a-tab-pane>
        <a-tab-pane :tab="$t('orderList.deliveryStatistics')" key="deliver"></a-tab-pane>
      </a-tabs>
      <div style="padding:0 120px 50px 20px;box-sizing:border-box">
        <div id="maineachart" style="width: 100%; height: 300px;"></div>
      </div>
    </div>

    <div style="background:#fff;margin-bottom:20px;">
      <a-tabs
        defaultActiveKey="1"
        size="large"
        :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
      >
        <div class="extra-wrapper" slot="tabBarExtraContent">
          <div class="extra-item">
            <a-tag
              @click="productBeforeM(beforeMonthS,beforeMonthE,1)"
              :color="productRankTag===1?'#FAAD14':''"
            >{{$t('orderList.lastMonth')}}</a-tag>
            <a-tag
              @click="productBeforeM(currentMonthS,currentMonthE,2)"
              :color="productRankTag===2?'#FAAD14':''"
            >{{$t('month')}}</a-tag>
          </div>
          <a-range-picker
            :style="{width: '256px'}"
            :placeholder="[StartDate, EndDate]"
            @change="dateProductRank"
            :value="pickDate(productTopQuery)"
          />
        </div>
        <a-tab-pane
          :tab="$t('orderList.productOrderRanking')"
          key="1"
          style="padding:0 20px 0 20px;box-sizing:border-box"
        >
          <a-table rowKey="key" :columns="columnsProduct" :dataSource="productRankData">
            <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </div>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          v-model="agentTopTabKey"
          @change="clientTab"
          size="large"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
        >
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a-tag
                @click="clientBeforeM(beforeMonthS,beforeMonthE,1)"
                :color="clientRankTag===1?'#FAAD14':''"
              >{{$t('orderList.lastMonth')}}</a-tag>
              <a-tag
                @click="clientBeforeM(currentMonthS,currentMonthE,2)"
                :color="clientRankTag===2?'#FAAD14':''"
              >{{$t('month')}}</a-tag>
            </div>

            <a-range-picker
              :style="{width: '256px'}"
              :placeholder="[StartDate, EndDate]"
              @change="dateClient"
              :value="pickDate(agentTopQuery)"
            />
          </div>
          <a-tab-pane
            loading="true"
            :tab="$t('orderList.customerOrderRanking')"
            key="order"
            style="padding:0 20px 0 20px;box-sizing:border-box"
          >
            <a-table rowKey="key" :columns="ordersByAgentTOP" :dataSource="clientBookData">
              <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
            </a-table>
          </a-tab-pane>
          <a-tab-pane
            :tab="$t('orderList.customerDeliveryRanking')"
            key="deliver"
            style="padding:0 20px 0 20px;box-sizing:border-box"
          >
            <a-table rowKey="key" :columns="columnsDeliver" :dataSource="clientDeliverData">
              <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
            </a-table>
          </a-tab-pane>
          <a-tab-pane
            :tab="$t('orderList.customerReceiptAmountRanking')"
            key="payment"
            style="padding:0 20px 0 20px;box-sizing:border-box"
          >
            <a-table rowKey="key" :columns="columnsGather" :dataSource="clientGatherData">
              <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import * as analysis from '@/api/dashboard/analysis'
import moment from 'moment'
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  RankList,
  Bar,
  Trend,
  NumberInfo,
  MiniSmoothArea
} from '@/components'
import { mixinDevice } from '@/utils/mixin'
import echarts from 'echarts'

//业务概览
const orderBaseData = []
const orderOverviewData = []
const productRankTag = 3
const clientRankTag = 3
//日期
const StartDate = moment()
  .startOf('day')
  .subtract(6, 'days')
  .format('YYYY-MM-DD') //7天
const EndDate = moment()
  .endOf('day')
  .format('YYYY-MM-DD') //当日
const thrityDay = moment()
  .startOf('day')
  .subtract(29, 'days')
  .format('YYYY-MM-DD') //30天
const yearOne = moment()
  .startOf('year')
  .format('YYYY-MM-DD') //本年
//上月开始
const beforeMonthS = moment()
  .month(moment().month() - 1)
  .startOf('month')
  .format('YYYY-MM-DD')
//上月结束
const beforeMonthE = moment()
  .month(moment().month() - 1)
  .endOf('month')
  .format('YYYY-MM-DD')
//本月开始
const currentMonthS = moment()
  .month(moment().month())
  .startOf('month')
  .format('YYYY-MM-DD')
//本月结束
const currentMonthE = moment()
  .month(moment().month())
  .endOf('month')
  .format('YYYY-MM-DD')

const TimeType = 'OTHER'
const SkipCount = 0
const MaxResultCount = 10

//订货信息
const orderStatisticsData = []
//发货信息
const deliverData = []
//折线图
const lineChartX = ['2019-1-1', '2019-2-1', '2019-3-1', '2019-4-1', '2019-5-1', '2019-6-1', '2019-7-1']
const lineChartYL = [0, 1, 3, 4, 1, 3, 0]
const lineChartYR = [0, 0, 2, 3, 0, 2, 0]

//商品订货排行
const productRankData = []

//客户收款排行
const clientGatherData = []

export default {
  name: 'Analysis',
  mixins: [mixinDevice],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea
  },
  data() {
    return {
      orderBaseData,
      orderOverviewData,
      StartDate,
      EndDate,
      thrityDay,
      yearOne,
      beforeMonthS,
      beforeMonthE,
      currentMonthS,
      currentMonthE,
      rangeTag: {
        curIndex: 3,
        list: [
          { name: this.$t('orderList.aWeek') },
          { name: this.$t('orderList.aMonth') },
          { name: this.$t('orderList.currentYear') }
        ]
      },
      statistisTag: {
        curIndex: 3,
        list: [
          { name: this.$t('orderList.aWeek') },
          { name: this.$t('orderList.aMonth') },
          { name: this.$t('orderList.currentYear') }
        ]
      },
      productRankTag,
      clientRankTag,
      TimeType,
      SkipCount,
      MaxResultCount,
      orderStatisticsData,
      deliverData,
      lineChartX,
      lineChartYL,
      lineChartYR,
      columnsProduct: [
        {
          title: this.$t('table.sort'),
          dataIndex: '',
          key: 'proRank',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: this.$t('table.productCode'),
          dataIndex: 'productCode',
          key: 'proCode'
        },
        {
          title: this.$t('table.productName'),
          dataIndex: 'productName',
          key: 'proName'
        },
        {
          title: this.$t('table.orderMoney'),
          dataIndex: 'price',
          key: 'proPrice'
        },
        {
          title: this.$t('table.proportion'),
          key: 'proPercent',
          dataIndex: 'percent'
        }
      ],
      ordersByAgentTOP: [
        {
          title: this.$t('table.sort'),
          dataIndex: 'bookRank',
          key: 'bookRank',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: this.$t('table.agentName'),
          dataIndex: 'agentName',
          key: 'agentName'
        },
        {
          title: this.$t('table.orderMoney'),
          key: 'totalMoney',
          dataIndex: 'totalMoney'
        },
        {
          title: this.$t('table.proportion'),
          key: 'percent',
          dataIndex: 'percent'
        }
      ],
      columnsDeliver: [
        {
          title: this.$t('table.sort'),
          dataIndex: 'deliverRank',
          key: 'deliverRank',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: this.$t('table.agentName'),
          dataIndex: 'deliverClient',
          key: 'deliverClient'
        },
        {
          title: this.$t('table.deliverMoney'),
          key: 'deliverPrice',
          dataIndex: 'deliverPrice'
        },
        {
          title: this.$t('table.proportion'),
          key: 'deliverPercent',
          dataIndex: 'deliverPercent'
        }
      ],
      columnsGather: [
        {
          title: this.$t('table.sort'),
          dataIndex: 'gatherRank',
          key: 'gatherRank',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: this.$t('table.agentName'),
          dataIndex: 'agentName',
          key: 'agentName'
        },
        {
          title: this.$t('table.paymentMoney'),
          key: 'totalMoney',
          dataIndex: 'totalMoney'
        },
        {
          title: this.$t('table.proportion'),
          key: 'percent',
          dataIndex: 'percent'
        }
      ],
      productRankData: [],
      clientBookData: [],
      clientDeliverData: [],
      clientGatherData: [],
      loading: true,
      charts: '',
      opinionData: ['3', '2', '4', '4', '5'],
      businessQuery: { TimeType: TimeType, StartDate: StartDate, EndDate: EndDate },
      statistisQuery: {
        TimeType: TimeType,
        StartDate: StartDate,
        EndDate: EndDate
      },
      productTopQuery: {
        SkipCount: SkipCount,
        MaxResultCount: MaxResultCount,
        TimeType: TimeType,
        StartDate: StartDate,
        EndDate: EndDate
      },
      agentTopQuery: {
        SkipCount: SkipCount,
        MaxResultCount: MaxResultCount,
        TimeType: TimeType,
        StartDate: StartDate,
        EndDate: EndDate
      },
      agentTopTabKey: 'order',
      staticTabKey: 'order'
    }
  },
  mounted() {
    this.getAll()
    this.orderBusinessOverview()
    this.orderStatistics()
    this.productRank()
    this.clientBook(StartDate, EndDate)
  },
  computed: {},
  methods: {
    //订单数据
    getAll() {
      analysis.getAll().then(result => {
        this.orderBaseData = result
        // console.log("result",result)
      })
    },
    //业务概览日期选择
    rangeSelect(item, index) {
      this.rangeTag.curIndex = index
      if (index == 0) {
        this.businessQuery.TimeType = TimeType
        this.businessQuery.StartDate = StartDate
        this.businessQuery.EndDate = EndDate
        this.orderBusinessOverview()
      } else if (index == 1) {
        this.businessQuery.TimeType = TimeType
        this.businessQuery.StartDate = thrityDay
        this.businessQuery.EndDate = EndDate
        this.orderBusinessOverview()
      } else {
        this.businessQuery.TimeType = TimeType
        this.businessQuery.StartDate = yearOne
        this.businessQuery.EndDate = EndDate
        this.orderBusinessOverview()
      }
    },
    //业务概览日期范围选择
    dateChange(date, dateString) {
      const StartDate = dateString[0]
      const EndDate = dateString[1]
      this.businessQuery.TimeType = TimeType
      this.businessQuery.StartDate = StartDate
      this.businessQuery.EndDate = EndDate
      this.orderBusinessOverview()
      this.rangeTag.curIndex = 4
    },
    //业务概览数据
    orderBusinessOverview() {
      analysis.orderBusinessOverview(this.businessQuery).then(result => {
        this.orderOverviewData = result
      })
    },
    //统计日期范围选择
    dateProduct(date, dateString) {
      // console.log("选择时间",dateString)
      const ProductStart = dateString[0]
      const ProductEnd = dateString[1]
      this.statistisQuery.StartDate = ProductStart
      this.statistisQuery.EndDate = ProductEnd
      this.statistisQuery.TimeType = TimeType
      this.orderStatistics()
      this.deliverStatistics()
      this.statistisTag.curIndex = 4
    },
    rangeStatics(item, index) {
      this.statistisTag.curIndex = index
      if (index == 0) {
        this.statistisQuery.StartDate = StartDate
        this.statistisQuery.EndDate = EndDate
        this.statistisQuery.TimeType = TimeType
      } else if (index == 1) {
        this.statistisQuery.StartDate = thrityDay
        this.statistisQuery.EndDate = EndDate
        this.statistisQuery.TimeType = TimeType
      } else {
        this.statistisQuery.StartDate = yearOne
        this.statistisQuery.EndDate = EndDate
        this.statistisQuery.TimeType = TimeType
      }
      if (this.staticTabKey == 'order') {
        this.orderStatistics()
      } else if (this.staticTabKey == 'deliver') {
        this.deliverStatistics()
      }
    },
    //订货统计
    orderStatistics() {
      // console.log("折线图日期hhh",StartDate,EndDate)
      analysis.orderStatistics(this.statistisQuery).then(result => {
        console.log(result)
        this.orderStatisticsData = result
        this.lineChartX = result.data.months
        this.lineChartYL = result.data.pays
        this.lineChartYR = result.data.orderCounts
        console.log('订货统计', result)
        this.$nextTick(function() {
          this.drawLine('maineachart')
        })
      })
    },
    //发货统计
    deliverStatistics() {
      analysis.deliverStatistics(this.statistisQuery).then(result => {
        this.deliverData = result
        this.lineChartX = result.data.months
        this.lineChartYL = result.data.pays
        this.lineChartYR = result.data.orderCounts
        console.log('发货统计', result)
        this.$nextTick(function() {
          this.drawDeliverLine('maineachart')
        })
      })
    },
    //订货统计-发货统计切换
    staticTab(key) {
      if (key == 1) {
        this.orderStatistics()
        // this.statistisTag.curIndex=''
      } else {
        this.deliverStatistics()
        // this.statistisTag.curIndex=''
      }
    },
    //发货统计的折线图
    drawDeliverLine(id) {
      this.charts = echarts.init(document.getElementById(id))
      var data = ['发货金额(元)', '发货数量(笔)']
      this.charts.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: data
        },
        color: ['#3fd1c3', '#fca233'],
        grid: {
          left: '6%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            // saveAsImage: {}
          }
        },
        xAxis: {
          //设置x轴
          type: 'category',
          data: this.lineChartX,
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: '#666',
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {
            //坐标轴轴线相关设置。
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666'
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            name: data[0],
            scale: 'true',
            position: 'left',
            nameTextStyle: {
              color: '#aaa'
            },
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#666'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#eee'
              }
            }
          },
          {
            type: 'value',
            name: data[1],
            nameTextStyle: {
              color: '#aaa'
            },
            scale: 'true',
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#666'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#eee'
              }
            }
          }
        ],
        series: [
          {
            name: data[0],
            type: 'line', // 类型为折线图
            data: this.lineChartYL,
            yAxisIndex: 0,
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              normal: {
                color: '#3fd1c3'
              }
            }
          },
          {
            name: data[1],
            type: 'line',
            data: this.lineChartYR,
            yAxisIndex: 1,
            lineStyle: {
              normal: {
                color: '#fca233'
              }
            }
          }
        ]
      })
    },
    //折线图
    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [this.$t('orderList.orderMoney'), this.$t('orderList.orderCount')]
        },
        color: ['#3fd1c3', '#fca233'],
        grid: {
          left: '6%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            // saveAsImage: {}
          }
        },
        xAxis: {
          //设置x轴
          type: 'category',
          data: this.lineChartX,
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: '#666',
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {
            //坐标轴轴线相关设置。
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666'
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            name: this.$t('orderList.orderMoney'),
            scale: 'true',
            position: 'left',
            nameTextStyle: {
              color: '#aaa'
            },
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#666'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#eee'
              }
            }
          },
          {
            type: 'value',
            name: this.$t('orderList.orderCount'),
            nameTextStyle: {
              color: '#aaa'
            },
            scale: 'true',
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#666'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#eee'
              }
            }
          }
        ],
        series: [
          {
            name: this.$t('orderList.orderMoney'),
            type: 'line', // 类型为折线图
            data: this.lineChartYL,
            yAxisIndex: 0,
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              normal: {
                color: '#3fd1c3'
              }
            }
          },
          {
            name: this.$t('orderList.orderCount'),
            type: 'line',
            data: this.lineChartYR,
            yAxisIndex: 1,
            lineStyle: {
              normal: {
                color: '#fca233'
              }
            }
          }
        ]
      })
    },
    //商品订货排行
    productRank() {
      analysis.productTOP(this.productTopQuery).then(result => {
        this.productRankData = result.list
      })
    },
    //商品订货排行日期选择
    dateProductRank(date, dateString) {
      const ProductRankStart = dateString[0]
      const ProductRankEnd = dateString[1]

      this.productTopQuery.StartDate = ProductRankStart
      this.productTopQuery.EndDate = ProductRankEnd
      this.productTopQuery.TimeType = TimeType
      this.productTopQuery.SkipCount = SkipCount
      this.productTopQuery.MaxResultCount = MaxResultCount
      this.productRank()
      this.productRankTag = 2
    },
    productBeforeM(beforeMonthS, beforeMonthE, tag) {
      this.productTopQuery.StartDate = beforeMonthS
      this.productTopQuery.EndDate = beforeMonthE
      this.productTopQuery.TimeType = TimeType
      this.productTopQuery.SkipCount = SkipCount
      this.productTopQuery.MaxResultCount = MaxResultCount
      this.productRank()
      this.productRankTag = tag
    },
    //客户订货排行-客户发货排行-客户收款排行切换
    clientTab(key) {
      // this.agentTopQuery.StartDate=StartDate
      // this.agentTopQuery.EndDate=EndDate
      this.agentTopQuery.TimeType = TimeType
      this.agentTopQuery.SkipCount = SkipCount
      this.agentTopQuery.MaxResultCount = MaxResultCount
      if (key == 1) {
        this.clientBook()
        // this.clientRankTag = ''
      } else if (key == 2) {
        this.clientDeliver()
        // this.clientRankTag = ''
      } else {
        this.paymentStatistics()
        // this.clientRankTag = ''
      }
    },
    //客户订货排行
    clientBook() {
      analysis.ordersByAgentTOP(this.agentTopQuery).then(result => {
        this.clientBookData = result.list
      })
    },
    //客户发货排行
    clientDeliver() {
      analysis.deliverStatistics(this.agentTopQuery).then(result => {
        this.clientDeliverData = result.agent.list
      })
    },
    //客户收款排行
    paymentStatistics() {
      analysis.paymentStatistics(this.agentTopQuery).then(result => {
        this.clientGatherData = result.list
      })
    },
    //客户排行日期范围选择
    dateClient(date, dateString) {
      const ClientStart = dateString[0]
      const ClientEnd = dateString[1]

      this.agentTopQuery.StartDate = ClientStart
      this.agentTopQuery.EndDate = ClientEnd
      this.agentTopQuery.TimeType = TimeType
      this.agentTopQuery.SkipCount = SkipCount
      this.agentTopQuery.MaxResultCount = MaxResultCount
      if (this.agentTopTabKey == 'order') {
        this.clientBook()
      } else if (this.agentTopTabKey == 'deliver') {
        this.clientDeliver()
      } else if (this.agentTopTabKey == 'payment') {
        this.paymentStatistics()
      }

      this.clientRankTag = 3
    },
    clientBeforeM(beforeMonthS, beforeMonthE, tag) {
      this.agentTopQuery.StartDate = beforeMonthS
      this.agentTopQuery.EndDate = beforeMonthE
      this.agentTopQuery.TimeType = TimeType
      this.agentTopQuery.SkipCount = SkipCount
      this.agentTopQuery.MaxResultCount = MaxResultCount
      if (this.agentTopTabKey == 'order') {
        this.clientBook()
      } else if (this.agentTopTabKey == 'deliver') {
        this.clientDeliver()
      } else if (this.agentTopTabKey == 'payment') {
        this.paymentStatistics()
      }
      this.clientRankTag = tag
    },
    moment,
    getCurrentData() {
      return new Date().toLocaleDateString()
    },
    pickDate(record) {
      var tt = [moment(record.StartDate, 'YYYY-MM-DD HH:mm'), moment(record.EndDate, 'YYYY-MM-DD HH:mm')]
      return tt
    }
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;
}

.antd-pro-pages-dashboard-analysis-salesCard {
  height: calc(100% - 24px);
  /deep/ .ant-card-head {
    position: relative;
  }
}

.dashboard-analysis-iconGroup {
  i {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition: color 0.32s;
    color: black;
  }
}
.analysis-salesTypeRadio {
  position: absolute;
  right: 54px;
  bottom: 12px;
}
.dashboard-analysis-statistics {
  width: 100%;
  margin-bottom: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  font-size: 16px;
}
.dashboard-analysis-order {
  width: 100%;
  height: 100px;
  display: flex;
  border-bottom: 1px solid #eee;
}
.dashboard-analysis-order-wait {
  width: 33.3%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-img {
  background-image: url(../../assets/icons/icon_corpIndex.png);
  width: 45px;
  height: 42px;
}
.icon-img1 {
  background-position: 0 -2px;
}
.icon-img2 {
  background-position: 0 -54px;
}
.icon-img3 {
  background-position: 0 -104px;
}
.dashboard-analysis-order-wait span {
  font-size: 20px;
  color: #f89d3b;
}
.rangeActive {
  color: #f89d3b;
}
.rangeActivec {
  border: 1px solid #f89d3b;
  border-radius: 5px;
}
.tab-pane-overview {
  display: flex;
  padding: 0 20px 30px;
  box-sizing: border-box;
}
.tab-pane-content {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.order-quantity {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
}
.amount-detail {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.amount-detail span {
  display: block;
  height: 20px;
  margin-top: 5px;
}
.type-col {
  font-size: 14px;
  color: rgb(143, 142, 142);
}
.number-col {
  font-size: 18px;
  color: #f89d3b;
}
.wait-type {
  margin: 0 20px 0 10px;
}
.ant-col-xl-rank {
  width: 50%;
}
.ant-col-xl-rank-right {
  padding: 0;
  margin: 0;
  width: 25%;
}
.ant-col-xl-rank-padding {
  padding: 0 20px 32px 30px;
}
</style>
