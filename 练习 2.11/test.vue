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
                <FormItem label="土地类型" prop="landType">
                    <Input v-model="formValidate.landType" placeholder="土地类型"></Input>
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
            <!-- <Col span="8">
                <FormItem label="合作方式" prop="coopType">
                    <Select v-model="formValidate.coopType" placeholder="必须三选一">
                        <Option value="土地确权证">土地确权证</Option>
                        <Option value="土地承包合同">土地承包合同</Option>
                        <Option value="村里台账信息">村里台账信息</Option>
                    </Select>
                </FormItem>
            </Col> -->
        </Row>
  <Row>
            <Col span="8">
                <FormItem label="地址" prop="address">
                    <Input v-model="formValidate.address" placeholder="地址"></Input>
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
            <input type="hidden" v-model="filePath">
                <Upload :action="actionUrl" name="file"  :on-success="onSuccess" >
                    <Button type="ghost" icon="ios-cloud-upload-outline">土地合同上传</Button>
                </Upload>
                <!-- <input  name="file" type="file" accept="image/png,image/gif,image/jpeg" onclick="uploadpic(event)"/> -->
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
      filePath: "",
      formValidate: {
        landNum: "",
        acreage: "",
        landType: "",
        comment: "",
        owner: "",
        soilArea: "",
        idNum: "",
        telNum: "",
        address: "",
        soilName: ""
      },
      ruleValidate: {
        landNum: [{ required: true, message: "此项不能为空", trigger: "blur" }],
        acreage: [{ required: true, message: "此项不能为空", trigger: "blur" }],
        landType: [
          //   {
          //     required: true,
          //     pattern: /^1[34578]\d{9}$/,
          //     message: "不能为空或格式错误",
          //     trigger: "blur"
          //   }
        ],
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
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        idNum: [{ required: true, message: "此项不能为空", trigger: "blur" }],
        telNum: [
          //   {
          //     required: true,
          //     pattern: /^1[34578]\d{9}$/,
          //     message: "不能为空或格式错误",
          //     trigger: "blur"
          //   }
        ],
        address: [{ required: true, message: "此项不能为空", trigger: "blur" }],
        soilName: [
          { required: true, message: "必须选择一项", trigger: "change" }
        ]
      },
      columns1: [
        {
          title: "序号",
          key: "coopIndex"
        },
        {
          title: "地块编码",
          key: "landNum"
        },
        {
          title: "土地面积（亩）",
          key: "acreage"
        },
        {
          title: "土地类型",
          key: "landType"
        },
        {
          title: "备注",
          key: "comment"
        },
        {
          title: "土地拥有者",
          key: "owner"
        },
        {
          title: "土地区域",
          key: "soilArea"
        },

        {
          title: "身份证号",
          key: "idNum"
        },
        {
          title: "电话",
          key: "telNum"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "土地合同名称",
          key: "soilName"
        }
      ],
      data1: [],
      actionUrl:"https://www.wuyangdata.com/tland/inserttland",
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
    //                coopType:''
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
          o.landNum = res.data.tlands[i].landNum;
          o.acreage = res.data.tlands[i].acreage;
          o.landType = res.data.tlands[i].landType;
          o.comment = res.data.tlands[i].comment;
          o.owner = res.data.tlands[i].owner;
          o.soilArea = res.data.tlands[i].soilArea;
          o.idNum = res.data.tlands[i].idNum;
          o.telNum = res.data.tlands[i].telNum;
          o.address = res.data.tlands[i].address;
          o.soilName = res.data.tlands[i].soilName;
          this.data1.push(o);
        }
      })
      .catch(error => {
        this.$Message.error(error);
      });
  },
  methods: {
    onSuccess(response) {
      console.log(response)
      this.filePath = response;
    },
    handleSubmit(name) {
      // axios.post("https://www.wuyangdata.com/tland/inserttland", )
//       axios({
//   method: 'post',
//   url: 'https://www.wuyangdata.com/tland/inserttland',
//   data: {
//     file: this.file
//   },
//   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
// });
      this.$refs[name].validate(valid => {
        if (valid) {
     
          let params = new URLSearchParams();

          params.append("landNum", this.formValidate.landNum);
          params.append("acreage", this.formValidate.acreage);
          params.append("landType", this.formValidate.landType);
          params.append("comment", this.formValidate.comment);
          params.append("owner", this.formValidate.owner);
          params.append("soilArea", this.formValidate.soilArea);
          params.append("idNum", this.formValidate.idNum);
          params.append("telNum", this.formValidate.telNum);
          params.append("address", this.formValidate.address);
          params.append("soilName", this.formValidate.soilName);
          params.append("file", this.filePath);
          //   res.append("dept_id", sessionStorage.getItem("dept_id"));
          axios
            // .post("https://www.wuyangdata.com/tland/inserttland", params2,{headers:{
            //     'Content-Type': 'multipart/form-data'}})
            .post("https://www.wuyangdata.com/tland/inserttland", params)
            .then(res => {
              console.log(res);
              this.data1.push({
                coopIndex: ++this.thisIndex,
                landNum: this.formValidate.landNum,
                acreage: this.formValidate.acreage,
                landType: this.formValidate.landType,
                comment: this.formValidate.comment,
                address: this.formValidate.address,
                owner: this.formValidate.owner,
                soilArea: this.formValidate.soilArea,
                idNum: this.formValidate.idNum,
                telNum: this.formValidate.telNum,
                soilName: this.formValidate.soilName,
                // file:this.filePath
              });




              
            //   function uploadpic(e){
            //       var self = this
            //       console.log(e.target);
            //       let file = e.target.files[0]
            //       /* eslint-disable no-undef */
            //       let param = new FormData()  // 创建form对象
				  
            //       let tLand= {
            //       landNum:'test'
            //       }
            //       param.append('file', file, file.name)  // 通过append向form对象添加数据
            //       param.append('tLand', tLand) // 添加form表单中其他数据
            //       console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
					
            //       let config = {
            //         headers: {'Content-Type': 'multipart/form-data'}
            //       }
				  
            //      // 添加请求头
            //     axios.post('https://192.168.1.113:60001/tland/inserttland',param,config)
            //         .then(response => {


                      
            //         })
            // }
            })
            .catch(error => {
              this.$Message.error(error);
            });
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


