<template>
<div>


    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <Row>
            <Col span="8">
                <FormItem label="经营车辆名称" prop="vehiclesName">
                    <Input v-model="formValidate.vehiclesName" placeholder="经营车辆名称"></Input>
                </FormItem>
            </Col>
            
            <Col span="8">
                <FormItem label="拥有者" prop="vehiclesOwner">
                    <Input v-model="formValidate.vehiclesOwner" placeholder="拥有者"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="买价" prop="vehiclesBuyPrice">
                    <Input v-model="formValidate.vehiclesBuyPrice" placeholder="买价"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <FormItem label="卖价:单价（万元）" prop="vehiclesSellPrice">
                    <Input v-model="formValidate.vehiclesSellPrice" placeholder="卖价:单价（万元）"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="品牌" prop="vehiclesBrand">
                    <Input v-model="formValidate.vehiclesBrand" placeholder="品牌"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="数量" prop="vehiclesNum">
                    <Input v-model="formValidate.vehiclesNum" placeholder="数量"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <FormItem label="购买时间">
                    <DatePicker type="date" format='yyyy-MM-dd' v-model="formValidate.vehiclesBuyTime" placeholder="购买时间" style="width: 200px"></DatePicker>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="补贴（万元）" prop="vehiclesAllowance">
                    <Input v-model="formValidate.vehiclesAllowance" placeholder="补贴（万元）"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="部门id" prop="vehiclesDeptId">
                    <Input v-model="formValidate.vehiclesDeptId" placeholder="部门id"></Input>
                </FormItem>
            </Col>
        </Row>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
<Table border :columns="columns1" :data="data1"></Table>
<!-- <Page :total="100" :current="pageNum"  @on-change="changee"></Page> -->
 </div>   
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      formValidate: {
        vehiclesName: "",
        vehiclesBuyPrice: "",
        vehiclesAllowance: "",
        vehiclesSellPrice: "",
        vehiclesBrand: "",
        vehiclesNum: "",
        vehiclesBuyTime: "",
        vehiclesAllowance: "",
        vehiclesDeptId: "",
        vehiclesOwner: "",
     
      },
      ruleValidate: {
        vehiclesName: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        vehiclesBuyPrice: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          { required: true, message: '必须为数字', trigger: 'blur', pattern:/^[0-9]*$/ }          
        ],
        vehiclesAllowance: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        vehiclesSellPrice: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          { required: true, message: '必须为数字', trigger: 'blur', pattern:/^[0-9]*$/ }          
        ],
        vehiclesBrand: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        vehiclesNum: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          { required: true, message: '必须为数字', trigger: 'blur', pattern:/^[0-9]*$/ }          
        ],
        vehiclesBuyTime: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        vehiclesAllowance: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          { required: true, message: '必须为数字', trigger: 'blur', pattern:/^[0-9]*$/ }
        ],
        vehiclesDeptId: [
          { required: true, message: "必须选择一项", trigger: "change" }
        ]
      },
      columns1: [
        {
          title: "序号",
          key: "carsIndex"
        },
        {
          title: "Action",
          key: "delete",
          width: 80,
          align: "center",
          // fixed: "left",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: index => {
                      var machineId = this.data1.splice(index, 1)[0]
                        .machineId;
                        console.log(this.data1.splice(index, 1));
                      console.log(machineId);
                      axios
                        .post(
                          "https://www.wuyangdata.com/tmachine/deletemachine",
                          {
                            machineId: machineId
                          }
                        )
                        .then(res => {
                          console.log("删除成功");
                          console.log(res);
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        },
        {
          title: "经营车辆名称",
          key: "vehiclesName"
        },

        {
          title: "品牌型号",
          key: "vehiclesBrand"
        },
        {
          title: "卖家：单价(万元)",
          key: "vehiclesSellPrice"
        },

        {
          title: "购买金额(万元)",
          key: "vehiclesNum"
        },
        {
          title: "购买时间",
          key: "vehiclesBuyTime"
        },
        {
          title: "补贴(万元)",
          key: "vehiclesAllowance"
        },

        {
          title: "部门id",
          key: "vehiclesDeptId"
        }
      ],
      data1: [],
      thisIndex: 1,
      FormItem: []
    };
  },

  methods: {
    // changee(page){
    //     console.log(page)
    //     console.log(pageNum)
    //     },
    changeTime(thisDate) {
      let timer = new Date(thisDate);
      let timeStr =
        timer.getFullYear() +
        "-" +
        (timer.getMonth() + 1) +
        "-" +
        timer.getDate();
      return timeStr;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.carsAdd();
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },

    //信息提交
    carsAdd() {
      let params = new FormData();
      params.append("vehiclesName", this.formValidate.vehiclesName);
      params.append("vehiclesAllowance", this.formValidate.vehiclesAllowance);
      params.append("vehiclesSellPrice", this.formValidate.vehiclesSellPrice);
      params.append("vehiclesBrand", this.formValidate.vehiclesBrand);
      params.append("vehiclesNum", this.formValidate.vehiclesNum);
      params.append("vehiclesBuyTime",this.formValidate.vehiclesBuyTime);
      params.append("vehiclesBuyPrice", this.formValidate.vehiclesBuyPrice);
      params.append("vehiclesDeptId", this.formValidate.vehiclesDeptId);
      params.append("vehiclesOwner", this.formValidate.vehiclesOwner);
      // params.append("dept_id", sessionStorage.getItem("dept_id"));
      console.log(this.changeTime(this.formValidate.vehiclesBuyTime));
      axios
        .post("https://www.wuyangdata.com/toperatingvehicles/addvehicles", params)
        .then(response => {
          console.log(response);
          // let thisvehiclesAllowance = "合作社";
          // if (this.formValidate.vehiclesDeptId == "1") {
          //   thisvehiclesAllowance = "个人";
          // }
          this.data1.push({
            vehiclesDeptId: ++this.thisIndex,
            vehiclesOwner: this.formValidate.vehiclesOwner,
            vehiclesName: this.formValidate.vehiclesName,
            vehiclesBuyPrice: this.formValidate.vehiclesBuyPrice,
            vehiclesAllowance: this.formValidate.vehiclesAllowance,
            vehiclesSellPrice: this.formValidate.vehiclesSellPrice,
            vehiclesBrand: this.formValidate.vehiclesBrand,
            vehiclesNum: this.formValidate.vehiclesNum,
            vehiclesBuyTime: this.changeTime(this.formValidate.vehiclesBuyTime),
            vehiclesDeptId: this.formValidate.vehiclesDeptId,
            // vehiclesDeptId: thisvehiclesAllowance
          });
          console.log("成功");
        })
        .catch(error => {
          console.log("失败");
          console.log(error);
          this.$Message.error(error);
        });
    },
    carsGet() {
      // let params = new URLSearchParams();
      // params.append("dept_id", sessionStorage.getItem("dept_id"));

      axios
        .get("https://www.wuyangdata.com/toperatingvehicles/findallvehicles")
        .then(response => {
          console.log(response)
          for (let i = 0; i < response.data.tolist.length; i++) {
            this.thisIndex = i + 1;
            // let thisvehiclesAllowance = "合作社";
            // if (response.data.tmlist[i].vehiclesOwner == "1") {
            //   thisvehiclesAllowance = "个人";
            // }
            this.data1.push({
              carsIndex: i + 1,
              vehiclesOwner:response.data.tolist[i].vehiclesOwner,
              machineId: response.data.tolist[i].machineId,
              vehiclesName: response.data.tolist[i].vehiclesName,
              vehiclesBrand: response.data.tolist[i].vehiclesBrand,
              vehiclesSellPrice: response.data.tolist[i].vehiclesSellPrice,
              vehiclesNum: response.data.tolist[i].vehiclesNum,
              vehiclesBuyPrice: response.data.tolist[i].vehiclesBuyPrice,
              vehiclesBuyTime: response.data.tolist[i].vehiclesBuyTime,
              vehiclesAllowance: response.data.tolist[i].vehiclesAllowance,
              vehiclesDeptId: response.data.tolist[i].vehiclesDeptId,
              // vehiclesDeptId: thisvehiclesAllowance
            });
          }
          console.log(response);
        })
        .catch(error => {
          console.log(error);
          console.log("失败");
          this.$Message.error("错误" + error);
        });
    }
  },
  created() {
    this.carsGet();
  }
};
</script>


<style>

</style>


