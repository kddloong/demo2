import { Form, Input, InputRef, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormDependency } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';

const FormTags = () => {
  const [inputVisible, setInputVisible] = useState(false);

  const inputRef = useRef<InputRef>(null);

  const editInputRef = useRef<InputRef>(null);

  const [editInputIndex, setEditInputIndex] = useState(-1);

  const [editInputValue, setEditInputValue] = useState('');

  const [inputValue, setInputValue] = useState('');

  const form = Form.useFormInstance();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    const tags: string[] = form.getFieldValue('tags');

    if (!tags) {
      form.setFieldsValue({ tags: [inputValue] });
    } else {
      if (inputValue && tags.indexOf(inputValue) === -1) {
        form.setFieldsValue({ tags: [...tags, inputValue] });
      }
    }

    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const tags: string[] = form.getFieldValue('tags');
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    form.setFieldsValue({ tags: newTags });
    setEditInputIndex(-1);
    setInputValue('');
  };

  const showInput = () => {
    setInputVisible(true);
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag: string) => {
    const tags: string[] = form.getFieldValue('tags');
    const newTags = tags?.filter((tag) => tag !== removedTag);
    form.setFieldsValue({
      tags: newTags,
    });
  };

  return (
    <>
      <ProFormDependency name={['tags']}>
        {({ tags }) => {
          return (
            <>
              <Form.Item name={'tags1'} label={'标签'}>
                <Space>
                  {(tags as string[])?.map((tag, index) => {
                    if (editInputIndex === index) {
                      return (
                        <Input
                          ref={editInputRef}
                          key={tag}
                          size="small"
                          className="tag-input"
                          value={editInputValue}
                          onChange={handleEditInputChange}
                          onBlur={handleEditInputConfirm}
                          onPressEnter={handleEditInputConfirm}
                        />
                      );
                    }

                    const tagElem = (
                      <Tag
                        className="edit-tag"
                        key={tag}
                        closable={true}
                        onClose={() => handleClose(tag)}
                        style={{
                          marginTop: '5px',
                        }}
                      >
                        <span
                          onDoubleClick={(e) => {
                            if (index !== 0) {
                              setEditInputIndex(index);
                              setEditInputValue(tag);
                              e.preventDefault();
                            }
                          }}
                        >
                          {tag}
                        </span>
                      </Tag>
                    );

                    return tagElem;
                  })}

                  {inputVisible && (
                    <Input
                      ref={inputRef}
                      type="text"
                      size="small"
                      className="tag-input1"
                      value={inputValue}
                      onChange={handleInputChange}
                      onBlur={handleInputConfirm}
                      onPressEnter={handleInputConfirm}
                      maxLength={4}
                    />
                  )}

                  {!inputVisible && (tags?.length ?? 0) < 10 && (
                    <Tag
                      className="site-tag-plus"
                      style={{
                        marginTop: '5px',
                      }}
                      onClick={showInput}
                    >
                      <PlusOutlined /> 新标签
                    </Tag>
                  )}
                </Space>
              </Form.Item>
            </>
          );
        }}
      </ProFormDependency>
    </>
  );
};
export { FormTags };
