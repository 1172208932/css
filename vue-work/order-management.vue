<style lang="less">
@import "../../../../styles/common.less";
@import "../../access.less";
@import "../../tables/components/table.less";
</style>

<template>

<div>
  <div v-if="isshow">
      <Row style="width:100%">
          <Col span="24" style="margin-bottom:20px;">
            <Col span="24" style="position:relative;background:#ffffff;height:265px">
              <img span="24" style="top:0;left:0;width:100%" src="../../../images/order_01.png" alt="">
              <span style="position:absolute;bottom:100px;left:185px;font-size:24px;font-weight:500;">合作社名称</span>
              <Col span="24" style="height:63px;position:relative;">
                <Col span="5">
                    <Col style="z-index:2;margin-left:30px;margin-top:-66px;width:132px;height:132px;border:5px solid rgba(102, 204, 102, 1);border-radius:132px;">
                      <img style="transform:translate(50%, 50%);height:66px;" src="../../../images/order_02.png" alt="">
                    </Col>
                </Col>
                <Col span="5" style="height:90px;line-height:90px">
                  <img style="vertical-align:middle;height:37px;" src="../../../images/order_03.png" alt="">
                  <span style="font-size: 16px;">已实名认证</span>
                </Col>
                <Col span="8" style="height:90px;line-height:90px">
                  <img style="vertical-align:middle;height:37px" src="../../../images/order_04.png" alt="">
                  <span style="font-size:16px">5级</span>            
                </Col>  
                <Col span="6" style="height:90px;line-height:90px;">
                  <button @click="toBasic" style="font-size:16px;vertical-align:middle;color:white;text-align:center;line-height:42px;width:177px;height:42px;background-color:rgba(26, 173, 25, 1);border: none;border-radius: 21px;">编辑资料</button>
                </Col>         
                
              </Col>
            </Col>
          </Col>
          <Col span="24" style="margin-bottom:20px;">
            <Col span="18">
              <Card>
                <Input v-model="searchConName1" icon="search" @on-change="handleSearch1" placeholder="请输入订单号、订单名称、乙方关键字搜索" style="width:425px;padding-bottom:10px;" />
                <can-edit-table refs="table2" v-model="editInlineData" :columns-list="editInlineColumns"></can-edit-table>
                <router-view></router-view>
              </Card>
            </Col>
            <Col span="6">
              <Card style="height:120px;margin-left:10px;">
                <Col span="12" style="text-align:center">
                  <div style="border-right:1px #000000 solid;">
                    <div style="font-size: 28px;color: #1AAD19;">2</div>
                    <span style="font-size: 16px;">已完成</span>
                  </div>
                </Col>
                <Col span="12" style="text-align:center">
                  <div>
                    <div style="font-size: 28px;color: #1AAD19;">5</div>
                    <span style="font-size: 16px;">未完成</span>
                  </div>
                </Col>
              </Card> 
              <Card span="6" style="height:245px;margin-left:10px;margin-top:10px;">
                <p slot="title" style="font-size:16px;">
                  其他选项
                </p>
              </Card>
          </Col>
          </Col>
      </Row>
  </div> 
</div>
    



</template>




<script>
import canEditTable from "../../tables/components/preordermanagementusercanEditTable.vue";
import axios from "axios";

export default {
  name: "editable-table",
  components: {
    canEditTable
  },
  data() {
    return {
      isshow:true,
      formValidate: {
                    id: '',
                    beforehandNum: '',
                    compactNum: '',
                    concludeSignPlace: '',
                    concludeSignDate:'',
                },
                ruleValidate: {
                    id: [
                        { required: true, message: '这里不能为空', trigger: 'blur' }
                    ],
                    beforehandNum: [
                        { required: true, message: '这里不能为空', trigger: 'blur' }
                    ],
                    compactNum: [
                        { required: true, message: '这里不能为空', trigger: 'blur' }
                    ],
                    concludeSignPlace: [
                        { required: true, message: '这里不能为空', trigger: 'change' }
                    ],
                    concludeSignDate: [
                        { required: true, message: '这里不能为空', trigger: 'change' }
                    ]
                },
      // 地址
      local: "黑龙江",
      localID: 17,
      // 筛选的时间
      selectTime: "",
      // 筛选的品类
      selectType: "",

      // 品类列表
      typeLIst: [
        {
          value: 1,
          label: "玉米"
        },
        {
          value: 2,
          label: "大豆"
        },
        {
          value: 3,
          label: "土豆"
        },
        {
          value: 4,
          label: "稻米"
        }
      ],

      initTable1: [],

      editInlineColumns: [
        {
          title: "订单编号",
          align: "center",
          key: "id",
        //   width: 80
        },
        {
          title: "订单名称",
          align: "center",
          key: "beforehandNum",
        //   width: 80
        },
        {
          title: "发起者",
          align: "center",
          key: "compactNum",
          width: 80
        },
        {
          title: "签订地点",
          align: "center",
          key: "concludeSignPlace",
        //   width: 80,
          editable: true
        },
        {
          title: "分配数量",
          align: "center",
          key: "audit",
        //   width: 80
        },
        {
          title: "操作",
          align: "center",
          width: 190,
          key: "handle",
          handle: ["edit"]
        }
      ],
      editInlineData: [],
      cityList: [
        {
          value: "Canberra",
          label: "1"
        }
      ]
    };
  },
  methods: {
    toBasic(){
          this.$router.push({
          name:'testpage'
      })
    },
    handleSubmit (deptId) {
                this.$refs[deptId].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (deptId) {
                this.$refs[deptId].resetFields();
            },
    search(data, argumentObj) {
      let res = data;
      let dataClone = data;
      for (let argu in argumentObj) {
        if (argumentObj[argu].length > 0) {
          res = dataClone.filter(d => {
            if (!!d[argu]) {
              return d[argu].indexOf(argumentObj[argu]) > -1;
            }
          });
          dataClone = res;
        }
      }
      return res;
    },
    handleSearch3() {
      this.editInlineData = this.initTable1;
      this.editInlineData = this.search(this.initTable1, {
        beforehandNum: this.searchConName3
      });
    },
    handleCancel3() {
      this.searchConName3="";
      this.editInlineData = this.initTable1;
    },

    // 时间选择事件处理函数
    handleTimeSelect() {
      console.log(arguments);
    },
    // 品类选择处理函数
    handleTyleSelect() {
      console.log(arguments);
    }
  },
  mounted: function() {
    // 区域ID
    var localID = 17;

    //利用axios调用接口获取数据
    axios
      .get("http://39.107.253.90:60001/tbeforehandorder/findallorderpage")
      .then(
        response => {
          // console.log(response);
          // this.editInlineData = response.data.tbflist;
          console.log(response);
          // 筛选区域
          response.data.tbflist.forEach((item, index) => {
            // if (item.id === localID) {
            //   this.initTable1.push(item);
            // }
            this.initTable1.push(item);
          });
          this.editInlineData = this.initTable1;
          console.log(res);
        },
        response => {
          console.log("error");
        }
      );
  }
};
</script>



<style>
#changeP {
  height: 34px;
}
#pre-book {
  margin-right: 20px;
}
</style>
