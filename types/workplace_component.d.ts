declare namespace WorkplaceComponent {
  type WorkplaceComponentShowItem = {
    userId: string;
    xPosition: number;
    yPosition: number;
    code: string;
    type: string;
    width: number;
    id: string;
    height: number;
  };

  type ChangeCompParams = {
    xPosition: number;
    yPosition: number;
    id: string;
  };

  type AddModuleParams = {
    code?: string;
    xPosition: number;
    yPosition: number;
    id?: string;
    type?: string;
    width?: number;
    height?: number;
  };

  type ChooseModuleItem = {
    code: string;
    description: string;
    id: string;
    isChoose: string;
    isDefault: string;
    logo: string;
    memo: string;
    title: string;
    type: string;
    width: number;
    height: number;
    xPosition: number;
    yPosition: number;
  };
}
