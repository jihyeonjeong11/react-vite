import React from "react";
import { useState, useContext } from "react";

import styles from '@/styles/table.module.css';

// https://velog.io/@dnr6054/%EC%9C%A0%EC%9A%A9%ED%95%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%8C%A8%ED%84%B4-5%EA%B0%80%EC%A7%80
// advanced pattern 1: Compound Components Pattern을 간단하게 구현한 것입니다.

// 추상화 // 객체 지향 프로그래밍처럼 가능하게 한다. // + 객체 지향 원칙  solid 원칙이라는 

interface ComponentWithChildrenProps {
    children: (React.ReactNode & { type: { name: string } })[];
}

interface LayoutSwitchProps extends ComponentWithChildrenProps {
    defaultLayout: string;
}

interface LayoutButtonProps {
    children: React.ReactNode;
    layoutPreference: string;
    title: string;
}

interface LayoutContextState {
    activeLayout: string;
    setActiveLayout: (prevLayout: string) => void;
}

const LayoutContext = React.createContext<LayoutContextState | null>(null);

function useLayoutContext() {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error(`LayoutSwitch compound components cannot be rendered outside the LayoutSwitch component`);
    }
    return context;
}

function Button({ children, layoutPreference, title }: LayoutButtonProps) {
    const { activeLayout, setActiveLayout } = useLayoutContext();
    return (
        <button
            className={`layout-btn ${activeLayout === layoutPreference ? "active" : ""}`}
            onClick={() => setActiveLayout(layoutPreference)}
            title={title}
        >
            {children}
        </button>
    );
}

function Options({ children }: ComponentWithChildrenProps) {
    return (
        <div className={styles.layoutSwitchContainer}>
            {children.map((child) => {
                if (!React.isValidElement(child)) return null;
                if (child.type.name !== Button.name) {
                    throw new Error(
                        `${child.type.name || child.type} cannot be rendered inside LayoutSwitch.Options
              Valid Components are [${Button.name}]`
                    );
                }

                return child;
            })}
        </div>
    );
}

function Content({ children }: ComponentWithChildrenProps) {
    const { activeLayout } = useLayoutContext();
    return (
        <React.Fragment>
            {children.map((child) => {
                if (!React.isValidElement(child)) return null;
                if (child.props.activeLayout !== activeLayout) return null;

                return child;
            })}
        </React.Fragment>
    );
}

function LayoutSwitch({ children, defaultLayout }: LayoutSwitchProps) {
    const [activeLayout, setActiveLayout] = useState(defaultLayout);
    const value: LayoutContextState = {
        activeLayout,
        setActiveLayout,
    };
    return (
        <LayoutContext.Provider value={value}>
            {children.map((child) => {
                if (!React.isValidElement(child)) return null;
                if (![Options.name, Content.name].includes(child.type.name)) {
                    throw new Error(
                        `${child.type.name || child.type} cannot be rendered inside LayoutSwitch
              Valid Components are [${Options.name}, ${Content.name}]`
                    );
                }

                return child;
            })}
        </LayoutContext.Provider>
    );
}

LayoutSwitch.Button = Button;
LayoutSwitch.Options = Options;
LayoutSwitch.Content = Content;

export default LayoutSwitch;
