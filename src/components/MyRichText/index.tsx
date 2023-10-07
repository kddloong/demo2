import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { Form } from 'antd';
import { CLIENT_VERSION as version } from '@/utils/utils';

type MyRichTextProps = {
  name: string;
  hideImage?: boolean;

  maxLength?: null | number;
  height?: number;
};

const MyRichText: FC<MyRichTextProps> = (props) => {
  const form = Form.useFormInstance();

  const { hideImage = false, name, maxLength = null, height = 500 } = props;

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
  // const [editor, setEditor] = useState(null)                   // JS 语法

  const [html, setHtml] = useState('');

  // 工具栏配置
  // 默认显示所有工具，不需要的工具，在此添加
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
      'group-video',
      hideImage ? 'group-image' : '',
      'color',
      'bgColor',
      'fontFamily',
      'lineHeight',
      'bulletedList',
      'numberedList',
      'todo',
      'group-justify',
      'group-more-style',
      'group-indent',
      'emotion',
      'insertLink',
      'insertTable',
      'codeBlock',
      'divider',
      'undo',
      'redo',
      'fullScreen',
    ],
  }; // TS 语法
  // const toolbarConfig = { }                        // JS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...',
    MENU_CONF: {},
  };

  if (maxLength) {
    editorConfig.maxLength = maxLength;
  }

  /**
   * @date 2023-01-31 调整复制的逻辑
   * @param editor1
   * @param event
   */
  editorConfig.customPaste = (editor1: IDomEditor, event: ClipboardEvent): boolean => {
    // TS 语法
    // editorConfig.customPaste = (editor, event) => {                                       // JS 语法

    // event 是 ClipboardEvent 类型，可以拿到粘贴的数据
    // 可参考 https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent

    // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
    const text = event?.clipboardData?.getData('text/plain'); // 获取粘贴的纯文本
    // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

    const alreadyLength = editor1.getText().length;

    if (!text) {
      console.log(`未获取到文本`);
      return false;
    }

    // 同步
    editor1.insertText(
      text.slice(0, maxLength ? maxLength - alreadyLength : text?.length - alreadyLength),
    );

    // 阻止默认的粘贴行为
    event.preventDefault();
    return false;

    // 继续执行默认的粘贴行为
    // return true
  };

  /** 工具栏配置
   *
   */
  if (editorConfig.MENU_CONF) {
    editorConfig.MENU_CONF.uploadImage = {
      server: `${API_URL}/third-service/${version}/third/file/fileUpload`,
      fieldName: 'file',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      },
      // 继续写其他配置...
      onSuccess(file: File, res: any) {
        // TS 语法
        // onSuccess(file, res) {          // JS 语法
        console.log(`${file.name} 上传成功`, res);
      },
      customInsert(res: any, insertFn: any) {
        // TS 语法
        // customInsert(res, insertFn) {                  // JS 语法
        // res 即服务端的返回结果
        // 从 res 中找到 url alt href ，然后插入图片
        insertFn(res.data, '1', '1');
      },
      //【注意】不需要修改的不用写，wangEditor 会去 merge 当前其他配置
    };

    editorConfig.MENU_CONF.uploadVideo = {};
  }

  editorConfig.hoverbarKeys = {
    link: {
      menuKeys: ['editLink', 'unLink', 'viewLink'],
    },
    image: {
      menuKeys: [
        'imageWidth30',
        'imageWidth50',
        'imageWidth100',
        'editImage',
        'viewImageLink',
        'deleteImage',
      ],
    },
    pre: {
      menuKeys: ['enter', 'codeBlock', 'codeSelectLang'],
    },
    table: {
      menuKeys: [
        'enter',
        'tableHeader',
        'tableFullWidth',
        'insertTableRow',
        'deleteTableRow',
        'insertTableCol',
        'deleteTableCol',
        'deleteTable',
      ],
    },
    divider: {
      menuKeys: ['enter'],
    },
    video: {
      menuKeys: ['enter', 'editVideoSize'],
    },
    text: {
      menuKeys: [
        'headerSelect',
        // 'insertLink',
        // 'bulletedList',
        '|',
        // 文字颜色
        // 'color',
        // 背景颜色
        // 'bgColor',
        // 'bold',
        // 'through',
        'clearStyle',
      ],
    },
  };

  useEffect(() => {
    const content = form.getFieldValue(name);

    if (content) {
      const htmlArr = content.split(/\n/);

      const newHtml =
        htmlArr.length > 1
          ? htmlArr.map((item: string) => `<p>${item}</p>`).join(`\n`)
          : htmlArr.toString();

      editor?.setHtml(newHtml);

      setHtml(newHtml);
    }
  }, [form.getFieldValue(name)]);

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor === null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(changeor) => {
            setHtml(changeor.getHtml());
            form.setFieldsValue({
              [name]: changeor.getHtml(),
              [`${name}Base`]: changeor.getText(),
            });
          }}
          mode="default"
          style={{ height: `${height}px`, overflowY: 'hidden' }}
        />
      </div>
    </>
  );
};

export { MyRichText };
