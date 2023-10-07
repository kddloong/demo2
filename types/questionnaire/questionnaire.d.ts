export declare namespace Questionnaire {
  interface QuestionnaireParams {
    // 问卷状态默认传3
    surveyState: number;
  }

  type SurveyDetail = {
    // 所对应的surveyDirectory的ID
    directoryId: string;
    anItemLeastNum: number;
    anItemMostNum: number;
    calSumScore: number;
    dailyMaxAnswer: number;
    dailyMaxAnswerNum: number;
    ynEndNum: number;
    ynEndTime: number;
    ynStartTime: number;
    ruleCode: string;
    rule: number;
    refresh: number;
    effectiveUser: number;
    effectiveIp: number;
    endNum: number;
    endTime: string;
    id: string;
    startTime: string;
  };

  interface QuestionnaireInfo {
    // 短链接id
    sid: string;
    id: string;
    // 问卷标题
    surveyName: string;
    // 收集到的答卷数
    answerNum: number;
    // 状态 0 未发布  // 1 已发布  // 2 已结束
    surveyState: number;
    createDate: string;
    // 题目数量
    surveyQuNum: number;
    surveyDetail?: SurveyDetail;
  }

  //  原始数据列表类型
  interface OriginListType {
    // 开始回答时间
    bgAnDate: string;
    // 开始回答时间
    city: string;
    // 回答的题项目数 ---- 表示有些题下面会有多重回答
    completeItemNum: number;
    // 数据来源 0网调 1录入数据 2移动数据 3导入数据
    dataSource: number;
    // 结束回答时间
    endAnDate: string;
    // 审核状态 0未处理 1通过 2不通过
    handleState: number;
    //
    id: string;
    // 回答者IP
    ipAddr: string;
    //是否完成 1完成
    isComplete: number;
    // 是否是有效数据 1有效
    isEffective: number;
    // 回答者省
    province: string;
    surveyId: string;
    // 回答总分值
    totalScore: number;
    // 是否开启总分值显示 0:关闭 1:开启
    totalScoreStatus: number;
    // 回答用时
    totalTime: number;
  }

  type QuestionRadiosType = {
    anCount: number;
    checkType: string;
    id: string;
    isNote: number;
    isRequiredFill: number;
    optionName: string;
    optionTitle: string;
    orderById: number;
    questionId: string;
    scoreNum: number;
  };

  type QuestionCheckboxesType = {
    anCount: number;
    checkType: string;
    id: string;
    optionName: string;
    optionTitle: string;
    questionId: string;
    scoreNum: 0;
  };

  // 问卷答案分析频率
  // 用于统计报表显示
  interface AnswerStatisticType {
    anCount: number;
    id: string;
    // 不带格式的问卷标题
    quName: string;
    quNote: string;
    // 带格式的问卷标题
    quTitle: string;
    quType: string;
    questionRadios: QuestionRadiosType[];
    questionCheckboxes: QuestionCheckboxesType[];
  }

  interface AnswerMapType {
    anNumber: number;
    province: string;
  }

  type SurveyDayStatsData = {
    //   每天的回答数
    answerNum: string;
    day: string;
  };

  interface OneSurveyAnalysisType {
    // 回复平均用时 秒
    anAvgTime: number;
    // 回复最少用时 秒
    anMinTime: number;
    // 问卷回收率
    anRate: string;
    // 回复样本总数 包括所有回复数据
    answerNum: number;
    // 浏览器访问量
    broMap: object;
    // 浏览量
    browserNum: number;
    // 完成的数据
    completeNum: number;
    // 设备类型访问量
    dtsMap: object;
    // 有效数据
    effectiveNum: number;
    // 	第一条回答数据时间
    firstAnswer: string;
    // 通过
    handlePassNum: number;
    // 未通过
    handleUnPassNum: number;
    id: string;
    // 导入数据
    importNum: number;
    // 录入数据
    inputNum: number;
    // 标识是否是最新数据
    isNewData: number;
    // 最后一条回答数据时间
    lastAnswer: string;
    // 移动数据
    mobileNum: number;
    // 网调数据
    onlineNum: number;
    // 每日答题量统计
    surveyDayStatsData: SurveyDayStatsData[];
    surveyId: string;
    // 操作系统访问量
    sysMap: object;
    // 未完成的数据
    unCompleteNum: number;
    // 无效数据
    unEffectiveNum: number;
    // 未处理
    unHandleNum: number;
  }

  type AnswerRankingType = {
    // 问卷答卷量
    answerNum: string;
    // 问卷名称
    surveyName: string;
  };

  interface AllSurveyAnalysisType {
    // 总的答卷量
    answerCount: number;
    answerRanking: AnswerRankingType[];
    // 浏览器总访问量
    broMap: object;
    // 日创建问卷量
    daySurveyCount: number;
    // 设计中问卷
    designSurveyCount: number;
    // 设备类型总访问量
    dtsMap: object;
    // 已发布的问卷
    exeSurveyCount: number;
    // 总的问卷量
    surveyCount: number;
    surveyDayStatsData: SurveyDayStatsData[];
    // 操作系统总访问量
    sysMap: object;
    // 14天的日访问量
    visitDataMap: object;
    // 总的访问量
    visitorCount: number;
  }

  interface JumpAddressType {
    // 	所对应的surveyDirectory的ID
    directoryId: string;
    // 跳转地址
    reqUrl: string;
    // 跳转时是否携带参数 0:不携带 1:携带
    urlParam: number;
    // 跳转名称
    urlText: string;
    // 跳转方式 0:不启用 1:直接跳转 2:不跳转，显示跳转链接
    reqUrlType: number;
  }

  type SurveyLogicDetailType = {
    anItemLeastNum: number;
    anItemMostNum: number;
    calSumScore: number;
    dailyMaxAnswer: number;
    dailyMaxAnswerNum: number;
    directoryId: string;
    effective: number;
    effectiveIp: number;
    effectiveTime: number;
    effectiveUser: number;
    endNum: number;
    endTime: string;
    endType: number;
    id: string;
    mailOnly: number;
    refresh: number;
    refreshNum: number;
    reqUrl: string;
    reqUrlType: number;
    rule: number;
    ruleCode: string;
    showAnswerDa: number;
    showShareSurvey: number;
    startTime: string;
    surveyNote: string;
    surveyQuNum: number;
    urlParam: number;
    urlText: string;
    versions: number;
    ynEndNum: number;
    ynEndTime: number;
    ynStartTime: number;
  };
  type QuestionType = {
    anCount: number;
    answerInputRow: number;
    answerInputWidth: number;
    belongId: string;
    cellCount: number;
    checkType: string;
    colContent: string;
    contactsAttr: number;
    contactsField: string;
    copyFromId: string;
    hv: number;
    id: string;
    isRequired: number;
    isShow: number;
    keywords: string;
    optionContent: string;
    orderById: number;
    paramInt01: number;
    paramInt02: number;
    paramStr01: string;
    paramStr02: string;
    parentQuId: string;
    quName: string;
    quNote: string;
    quTag: number;
    quTitle: string;
    quType: string;
    questionLogics: [];
    randOrder: number;
    rowContent: string;
    tag: number;
    yesnoOption: string;
  };

  interface SurveyDesignLogicData {
    anItemLeastNum: number;
    answerNum: number;
    classifyId: string;
    dirType: number;
    excerptNum: number;
    id: string;
    isShare: number;
    jsonPath: string;
    parentId: string;
    questions: QuestionType[];
    sid: string;
    surveyDetail: SurveyLogicDetailType;
    surveyLogics: [];
    surveyModel: number;
    surveyName: string;
    surveyNameFormat: string;
    surveyQuNum: number;
    surveyState: number;
    surveyTag: number;
    viewAnswer: number;
  }

  // 人员数据
  interface SurveyUserStatsType {
    // 开始时间
    bgAnDate: string;
    dataSource: number;
    endAnDate: string;
    handleState: number;
    id: string;
    totalScoreStatus: number;
    userId: string;
    userName: string;
  }
}
