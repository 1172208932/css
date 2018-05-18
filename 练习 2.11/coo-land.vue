<template>
<div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <Row>
            <Col span="8">
                <FormItem label="地块编码" prop="landNum">
                    <Input v-model="formValidate.landNum" placeholder="地块编码"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="地块面积(亩)" prop="acreage">
                    <Input  v-model="formValidate.acreage" placeholder="地块面积(亩)"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="状态" prop="status">
                    <Input v-model="formValidate.status" placeholder="状态"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <FormItem label="备注" prop="comment">
                    <Input v-model="formValidate.comment" placeholder="备注"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="土地拥有者" prop="owner">
                    <Input v-model="formValidate.owner" placeholder="土地拥有者"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="土地区域" prop="soilArea">
                    <Input v-model="formValidate.soilArea" placeholder="土地区域"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <FormItem label="身份证号" prop="idNum">
                    <Input v-model="formValidate.idNum" placeholder="身份证号"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="电话" prop="telNum">
                    <Input v-model="formValidate.telNum" placeholder="电话"></Input>
                </FormItem>
            </Col>
            
        </Row>
        <Row>
            <Col span="8">
                <FormItem label="地址" prop="address">
                    <Input v-model="formValidate.address" placeholder="地址"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="地区ID" prop="areaId">
                    <Input v-model="formValidate.areaId" placeholder="地区ID"></Input>
                </FormItem>
            </Col>     
            <Col span="8">
                <FormItem label="合作社ID" prop="cooId">
                    <Input v-model="formValidate.cooId" placeholder="合作社ID"></Input>
                </FormItem>
            </Col>
     
        </Row>
        <Row>
            <Col span="8">
                <FormItem label="承包人ID" prop="contractor">
                    <Input v-model="formValidate.contractor" placeholder="承包人ID"></Input>
                </FormItem>
            </Col>

            <Col span="8">
                <FormItem label="经营人ID" prop="operatorId">
                    <Input v-model="formValidate.operatorId" placeholder="经营人ID"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="8">
              <FormItem label="经度" prop="longitude">
                <Input v-model="formValidate.longitude" placeholder="经度"></Input>
              </FormItem>  
            </Col>            
            <Col span="8">
              <FormItem label="纬度" prop="latitude">
                <Input v-model="formValidate.latitude" placeholder="纬度"></Input>
              </FormItem>  
            </Col>            
            <Col span="8">
              <FormItem label="操作员ID" prop="userId">
                <Input v-model="formValidate.userId" placeholder="操作员ID"></Input>
              </FormItem>  
            </Col>
        </Row>
        <Row>       
            <Col span="8">
                  <FormItem label="积温带" prop="jiwendai">
                    <Input v-model="formValidate.jiwendai" placeholder="积温带"></Input>
                  </FormItem>  
            </Col>
            <Col span="8">
                <FormItem label="合作方式" prop="landType">
                    <Select v-model="formValidate.landType" placeholder="必须三选一">
                        <Option value="土地确权证">土地确权证</Option>
                        <Option value="土地承包合同">土地承包合同</Option>
                        <Option value="村里台账信息">村里台账信息</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="土地合同名称" prop="soilName">
                    <Input v-model="formValidate.soilName" placeholder="土地合同名称"></Input>
                </FormItem>
            </Col>
        </Row>
        
        <Row>
            <Col span="8">
                <div>
                   <Upload
                        :before-upload="handleUpload"
                        action="https://www.wuyangdata.com/tland/inserttland">
                        <Button type="ghost" icon="ios-cloud-upload-outline">土地合同上传</Button>
                    </Upload>
                    <div v-if="file !== null">上传文件: {{ file.name }} <Button type="text" @click="handleSubmit" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '' }}</Button></div>
                </div>
            </Col>
        </Row>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
<Table border :columns="columns1" :data="data1"></Table>
 </div>   
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      file: null,
      loadingStatus: false,
      // filePath: "",

      formValidate: {
        landNum: "",
        acreage: "",
        status: "",
        comment: "",
        owner: "",
        soilArea: "",
        idNum: "",
        telNum: "",
        address: "",
        soilName: "",
        landType: "",
        contractor: "",
        areaId: "",
        cooId: "",
        operatorId: "",
        longitude: "",
        latitude: "",
        userId: "",
        createDate: "",
        modifyDate:"",
        jiwendai:"",
      },
      ruleValidate: {
        landNum: [{ required: true, message: "此项不能为空", trigger: "blur" }],
        acreage: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^\d+[.]*\d+$/,
            message: "必须为数字或格式错误",
            trigger: "blur"
          }
        ],
        status: [{ required: true, message: "此项不能为空", trigger: "blur" }],
        comment: [
          { required: true, message: "此项不能为空", trigger: "blur" }
          //   {
          //     type: "string",
          //     min: 18,
          //     max: 18,
          //     message: "身份证号应为18位",
          //     trigger: "blur"
          //   }
        ],
        owner: [{ required: true, message: "此项不能为空", trigger: "blur" }],
        soilArea: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^\d+[.]*\d+$/,
            message: "必须为数字或格式错误",
            trigger: "blur"
          }
        ],
        idNum: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^(\d{18}|\d{17}x)$/,
            message: "身份证号应为18位",
            trigger: "blur"
          }
        ],
        telNum: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^\d+[.]*\d+$/,
            message: "必须为数字或格式错误",
            trigger: "blur"
          }
        ],
        address: [{ required: true, message: "此项不能为空", trigger: "blur" }],
        soilName: [
          { required: true, message: "此项不能为空", trigger: "change" }
        ],
        landType: [
          { required: true, message: "必须选择一项", trigger: "change" }
        ],
        contractor: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^\d+[.]*\d+$/,
            message: "必须为数字或格式错误",
            trigger: "blur"
          }
        ],
        areaId: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^\d+[.]*\d+$/,
            message: "必须为数字或格式错误",
            trigger: "blur"
          }
        ],
        cooId: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^\d+[.]*\d+$/,
            message: "必须为数字或格式错误",
            trigger: "blur"
          }
        ],
        operatorId: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^\d+[.]*\d+$/,
            message: "必须为数字或格式错误",
            trigger: "blur"
          }
        ],
        longitude: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        latitude: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^\d+[.]*\d+$/,
            message: "必须为数字或格式错误",
            trigger: "blur"
          }
        ],
        jiwendai:[{ required: true, message: "此项不能为空", trigger: "blur" }]
      },
      columns1: [
        {
          title: "序号",
          key: "coopIndex",
          width: 150,
          align: "center",
          fixed: "left"
        },
        {
          title: "删除",
          key: "delete",
          width: 80,
          align: "center",
          fixed: "left",
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
                    click: () => {
                      this.remove(params.index)
                      // var ownCode = this.data1.splice(index, 1)[0].ownCode;
                      // console.log(this.data1.splice(index, 1)[0].ownCode);
                      // axios
                      //   .post("https://www.wuyangdata.com/tland/deletetland", {
                      //     ownCode: ownCode,
                      //     deleteFlag: 1
                      //   })
                      //   .then(res => {
                      //     console.log("删除成功");
                      //     console.log(res);
                      //   })
                      //   .catch(error => {
                      //     console.log(error);
                      //   });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        },
        {
          title: "地块编码",
          key: "landNum",
          width: 150
        },
        {
          title: "土地面积（亩）",
          key: "acreage",
          width: 150
        },
        {
          title: "土地类型",
          key: "landType",
          width: 150
        },
        {
          title: "备注",
          key: "comment",
          width: 150
        },
        {
          title: "土地拥有者",
          key: "owner",
          width: 150
        },
        {
          title: "土地区域",
          key: "soilArea",
          width: 150
        },

        {
          title: "身份证号",
          key: "idNum",
          width: 150
        },
        {
          title: "电话",
          key: "telNum",
          width: 150
        },
        {
          title: "地址",
          key: "address",
          width: 150
        },
        {
          title: "土地合同名称",
          key: "soilName",
          width: 150
        },
        {
          title: "承包人ID",
          key: "contractor",
          width: 150
        },
        {
          title: "地区ID",
          key: "areaId",
          width: 150
        },
        {
          title: "合作社Id",
          key: "cooId",
          width: 150
        },
        {
          title: "经营人ID",
          key: "operatorId",
          width: 150
        },
        {
          title: "经度",
          key: "longitude",
          width: 150
        },
        {
          title: "纬度",
          key: "latitude",
          width: 150
        },
        {
          title: "操作员ID",
          key: "userId",
          width: 150
        },
        {
          title:"创建时间",
          key:"createDate",
          width:150
        } ,
        {
          title:"修改日期",
          key:"modifyDate",
          width:150
        },
         {
          title:"积温带",
          key:"jiwendai",
          width:150
        },
        
      ],
      data1: [],
      actionUrl: "https://www.wuyangdata.com/tland/inserttland",
      thisIndex: 1
    };
  },
  created() {
    //            coopName: '',
    //                coopArea: '',
    //                coopTel: '',
    //                coopId: '',
    //                coopAddress: '',
    //                coopOwnre: '',
    //                coopOTel: '',
    //                coopOAddress: '',
    //                landType:''
    let params = new URLSearchParams();
    // params.append("dept_id", sessionStorage.getItem("dept_id"));
    axios
      .get("https://www.wuyangdata.com/tland/getalltland")
      .then(res => {
        console.log(res);
        for (var i = 0; i < res.data.tlands.length; i++) {
          this.thisIndex = i + 1;
          var o = new Object();
          o.coopIndex = i + 1;
          o.ownCode = res.data.tlands[i].ownCode;
          o.landNum = res.data.tlands[i].landNum;
          o.acreage = res.data.tlands[i].acreage;
          o.status = res.data.tlands[i].status;
          o.comment = res.data.tlands[i].comment;
          o.owner = res.data.tlands[i].owner;
          o.soilArea = res.data.tlands[i].soilArea;
          o.idNum = res.data.tlands[i].idNum;
          o.telNum = res.data.tlands[i].telNum;
          o.address = res.data.tlands[i].address;
          o.soilName = res.data.tlands[i].soilName;
          o.landType = res.data.tlands[i].landType;
          o.contractor = res.data.tlands[i].contractor;
          o.areaId = res.data.tlands[i].areaId;
            o.cooId = res.data.tlands[i].cooId;
            o.operatorId = res.data.tlands[i].operatorId;
            o.longitude = res.data.tlands[i].longitude;
            o.latitude = res.data.tlands[i].latitude;
            o.userId = res.data.tlands[i].userId;
            o.createDate = res.data.tlands[i].createDate;
            o.modifyDate = res.data.tlands[i].modifyDate;
            o.jiwendai = res.data.tlands[i].jiwendai;
            this.data1.push(o);
        }
      })
      .catch(error => {
        this.$Message.error(error);
      });
  },
  methods: {
    remove(index){
      console.log(this.data1[index].ownCode);
      var ownCode = this.data1[index].ownCode;
      axios.post('https://www.wuyangdata.com/tland/deletetland',{
        ownCode:ownCode,

      }).then(res=>{
        console.log(res);
        console.log("删除成功");
      }).catch(error=>{
        console.log(error);
        console.log("删除失败");
      })
                this.data1.splice(index, 1);
      
    },
    // onSuccess(response) {
    //   console.log(response);
    //   this.filePath = response;
    // },
    handleUpload(file) {
      this.file = file;

      return false;
    },
    handleSubmit(name) {
      this.loadingStatus = true;
      setTimeout(() => {
        // this.file = null;
        // this.loadingStatus = false;
        this.$Message.success("Success");
      }, 1500);
      this.$refs[name].validate(valid => {
        if (valid) {
          let params = new FormData();
          //  let config = {
          //           headers: {'Content-Type': 'multipart/form-data'}
          //         }
          // let param = new FormData()
          //        param.append('file', file, file.name)  // 通过append向form对象添加数据
          //         param.append('tLand', tLand)
          params.append("landNum", this.formValidate.landNum);
          params.append("acreage", this.formValidate.acreage);
          params.append("status", this.formValidate.status);
          params.append("comment", this.formValidate.comment);
          params.append("owner", this.formValidate.owner);
          params.append("soilArea", this.formValidate.soilArea);
          params.append("idNum", this.formValidate.idNum);
          params.append("telNum", this.formValidate.telNum);
          params.append("address", this.formValidate.address);
          params.append("soilName", this.formValidate.soilName);
          params.append("landType", this.formValidate.landType);
          params.append("contractor", this.formValidate.contractor);
          params.append("areaId", this.formValidate.areaId);
          params.append("cooId", this.formValidate.cooId);
          params.append("longitude", this.formValidate.longitude);
          params.append("operatorId", this.formValidate.operatorId);
          params.append("latitude", this.formValidate.latitude);
          params.append("userId", this.formValidate.userId);
          // params.append("createDate",this.formValidate.createDate);
          // params.append("modifyDate",this.formValidate.modifyDate);
          params.append("jiwendai",this.formValidate.jiwendai);
          params.append("file", this.file);
          // params.append("tLand", this.file);
          //   res.append("dept_id", sessionStorage.getItem("dept_id"));
          axios
            .post("https://www.wuyangdata.com/tland/inserttland", params)
            .then(res => {
              console.log(res);
              this.data1.push({
                coopIndex: ++this.thisIndex,
                landNum: this.formValidate.landNum,
                acreage: this.formValidate.acreage,
                status: this.formValidate.status,
                comment: this.formValidate.comment,
                address: this.formValidate.address,
                owner: this.formValidate.owner,
                soilArea: this.formValidate.soilArea,
                idNum: this.formValidate.idNum,
                telNum: this.formValidate.telNum,
                soilName: this.formValidate.soilName,
                landType: this.formValidate.landType,
                contractor: this.formValidate.contractor,
                areaId: this.formValidate.areaId,
                cooId: this.formValidate.cooId,
                operatorId: this.formValidate.operatorId,
                longitude: this.formValidate.longitude,
                latitude: this.formValidate.latitude,
                userId: this.formValidate.userId,
                // createDate:this.formValidate.createDate,
                // modifyDate:this.formValidate.modifyDate,
                jiwendai:this.formValidate.jiwendai,
                // file: this.file
              });
            })
            .catch(error => {
              console.log(error);
              this.$Message.error(error);
            });
          console.log(this.file);
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>


<style>
</style>


