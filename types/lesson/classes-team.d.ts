declare namespace ClassesTeam {
  type ClassesTeamItem = {
    //开始日期
    beginDate: number;
    //关联课程
    classId: string;
    //天数
    days: number;
    //结束日期
    endDate: number;
    //主键
    id: string;
    //班级名称
    name: string;
    //班级人数
    num: number;
    //状态 0:解散 1：正常
    status: string;
    //关联老师
    teacherId: string;
  };
}
