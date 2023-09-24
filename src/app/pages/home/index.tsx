import type { IpcRendererEvent } from "electron";
import { ipcRenderer } from "electron";
import type { FunctionComponent } from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { Grid, Backdrop, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SaveIcon from "@mui/icons-material/SaveRounded";
import RefreshIcon from "@mui/icons-material/RefreshRounded";
import RepartitionIcon from "@mui/icons-material/RepartitionRounded";
import { Body, Headline } from "@typography";
import { PlateIconButton, SmallSelect, StatPlate } from "@molecules";
import { InfoDialog, Header, PasswordDialog } from "@organisms";
import { useDocumentTitle } from "@hooks";
import { getYears, getStats } from "@api/raport";
import { CommandRunMessage, IStats } from "@types";
import {
  HomeContainer,
  QuickAccessButtonsWrapper,
  StatsTitleYearWrapper,
} from "./styles";
import { IPageProps } from "../types";

const Home: FunctionComponent<IPageProps> = ({ name }) => {
  useDocumentTitle(name);

  const navigate = useNavigate();

  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState<number | "default">("default");
  const [stats, setStats] = useState<IStats | null>(null);
  const [mounted, setMounted] = useState(false);

  const [backdropMessage, setBackdropMessage] = useState("");

  const [dumping, setDumping] = useState<"init" | "loading" | "loaded">("init");
  const [dumpingMessage, setDumpingMessage] = useState<
    CommandRunMessage | undefined
  >();

  const [serverUpdating, setServerUpdating] = useState<
    "init" | "loading" | "loaded"
  >("init");
  const [serverUpdatingMessage, setServerUpdatingMessage] = useState<
    CommandRunMessage | undefined
  >();

  const [dataRestoring, setDataRestoring] = useState<
    "init" | "loading" | "loaded"
  >("init");
  const [dataRestoringMessage, setDataRestoringMessage] = useState<
    CommandRunMessage | undefined
  >();
  const [passwordDialogOpen, setPasswordDialogOpen] =
    useState<boolean>(false);

  const [passwordHandler, setPasswordHandler] = useState<'update server' | 'restore data' | undefined>();

  const handleAddReceivingButtonClick = () => {
    navigate("/receivings", { state: { addReceiving: true } });
  };

  const handleMakeDumpButtonClick = () => {
    setDumping("loading");
    ipcRenderer.invoke("make dump");
  };

  const handleUpdateServerButtonClick = () => {
    setPasswordDialogOpen(true);
    setPasswordHandler('update server');
  };

  const handleUpdateServerPasswordProvided = (password: string | undefined) => {
    setPasswordDialogOpen(false);
    setPasswordHandler(undefined);

    if (password) {
      setServerUpdating('loading');
      setServerUpdating("loading");
      ipcRenderer.invoke("update server", password);
    }
  };

  const handleRestoreDataButtonClick = () => {
    setPasswordDialogOpen(true);
    setPasswordHandler('restore data');
  };

  const handleRestoreDataPasswordProvided = (password: string | undefined) => {
    console.log('HJERE');
    setPasswordDialogOpen(false);
    setPasswordHandler(undefined);

    if (password) {
      setDataRestoring("loading");
      ipcRenderer.invoke("restore data", password);
    }
  };

  const handleDumpEnded = useCallback(
    (_: IpcRendererEvent, m: CommandRunMessage) => {
      setDumpingMessage(m);
      setDumping("loaded");
    },
    []
  );

  const handleUpdateServerProgress = useCallback(
    (_: IpcRendererEvent, m: string) => {
      setBackdropMessage(m);
    },
    []
  );

  const handleUpdateServerEnded = useCallback(
    (_: IpcRendererEvent, m: CommandRunMessage) => {
      setBackdropMessage("");
      setServerUpdatingMessage(m);
      setServerUpdating("loaded");
    },
    []
  );

  const handleRestoreDataEnded = useCallback(
    (_: IpcRendererEvent, m: CommandRunMessage) => {
      setDataRestoringMessage(m);
      setDataRestoring("loaded");
    },
    []
  );

  useEffect(() => {
    getYears().then(({ data }) => {
      setYears(data);
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    setYear(years[0] || "default");
  }, [years]);

  useEffect(() => {
    if (mounted) {
      getStats(year === "default" ? "" : year).then(({ data }) => {
        setStats(data);
      });
    }
  }, [year, mounted]);

  useEffect(() => {
    ipcRenderer.on("dump ended", handleDumpEnded);
    ipcRenderer.on("update server progress", handleUpdateServerProgress);
    ipcRenderer.on("update server ended", handleUpdateServerEnded);
    ipcRenderer.on("restore data ended", handleRestoreDataEnded);

    return () => {
      ipcRenderer.off("dump ended", handleDumpEnded);
      ipcRenderer.off("update server progress", handleUpdateServerProgress);
      ipcRenderer.off("restore data ended", handleRestoreDataEnded);
    };
  }, []);

  const passwordHandlers = {
    'update server': handleUpdateServerPasswordProvided,
    'restore data': handleRestoreDataPasswordProvided
  }

  return (
    <>
      <Backdrop
        open={[dumping, serverUpdating, dataRestoring].includes("loading")}
        sx={{ color: "#fff", zIndex: 1002, flexDirection: "column" }}
      >
        <CircularProgress color="inherit" />
        {!!backdropMessage && <Body>{backdropMessage}</Body>}
      </Backdrop>
      <InfoDialog
        open={dumping === "loaded"}
        status={dumpingMessage?.status}
        title="Створення резервної копії"
        message={dumpingMessage?.message || ""}
        onClose={() => {
          setDumping("init");

          setTimeout(() => {
            setDumpingMessage(undefined);
          }, 200);
        }}
      />
      <InfoDialog
        open={serverUpdating === "loaded"}
        status={serverUpdatingMessage?.status}
        title="Оновлення сервера"
        message={serverUpdatingMessage?.message || ""}
        onClose={() => {
          setServerUpdating("init");

          setTimeout(() => {
            setServerUpdatingMessage(undefined);
          }, 200);
        }}
      />
      <InfoDialog
        open={dataRestoring === "loaded"}
        status={dataRestoringMessage?.status}
        title="Відновлення даних"
        message={dataRestoringMessage?.message || ""}
        onClose={() => {
          setDataRestoring("init");

          setTimeout(() => {
            setDataRestoringMessage(undefined);
          }, 200);
        }}
      />
      <PasswordDialog
        open={passwordDialogOpen}
        onClose={passwordHandler && passwordHandlers[passwordHandler]}
      />
      <Header title={name} />
      <HomeContainer>
        <Headline type="H4" margin="12px 0">
          Команди
        </Headline>
        <QuickAccessButtonsWrapper>
          <PlateIconButton
            bgColor="#69B578"
            text="Додати прийом"
            icon={<AddIcon />}
            onClick={handleAddReceivingButtonClick}
          />
          <PlateIconButton
            bgColor="#24a7db"
            text="Резервна копія"
            icon={<SaveIcon />}
            onClick={handleMakeDumpButtonClick}
          />
          <PlateIconButton
            bgColor="#f0f0f0"
            text="Оновити сервер"
            icon={<RefreshIcon />}
            onClick={handleUpdateServerButtonClick}
          />
          <PlateIconButton
            bgColor="#eb0c0c"
            text="Відновити дані"
            icon={<RepartitionIcon />}
            onClick={handleRestoreDataButtonClick}
          />
        </QuickAccessButtonsWrapper>
        <StatsTitleYearWrapper>
          <Headline type="H4" margin="24px 0">
            Статистика
          </Headline>
          <SmallSelect
            options={years.map((y) => ({
              label: y,
              value: y,
            }))}
            option={year}
            defaultLabel="За всі роки"
            onChange={(event) => {
              const value = event.target.value;
              setYear(value === "default" ? value : Number(event.target.value));
            }}
          />
        </StatsTitleYearWrapper>
        <Grid container gap="16px">
          <Grid item xs={2}>
            <StatPlate
              label="Максимальна"
              value={stats?.maxPrice || 0}
              unit="грн / кг"
            />
          </Grid>
          <Grid item xs={2}>
            <StatPlate
              label="Середня"
              value={stats?.avgPrice || 0}
              unit="грн / кг"
            />
          </Grid>
          <Grid item xs={2}>
            <StatPlate
              label="Мінімальна"
              value={stats?.minPrice || 0}
              unit="грн / кг"
            />
          </Grid>
          <Grid item xs={2}>
            <StatPlate
              label="Закуплено"
              value={stats?.totalWeight || 0}
              unit="кг"
            />
          </Grid>
          <Grid item xs={2}>
            <StatPlate
              label="Витрачено"
              value={stats?.totalPrice || 0}
              unit="грн"
            />
          </Grid>
          <Grid item xs={2}>
            <StatPlate
              label="Продано"
              value={stats?.soldWeight || 0}
              unit="кг"
            />
          </Grid>
          <Grid item xs={2}>
            <StatPlate
              label="Зароблено"
              value={Math.round(stats?.earned || 0)}
              unit="грн"
            />
          </Grid>
          <Grid item xs={2}>
            <StatPlate
              label="Залишок"
              value={
                +((stats?.totalWeight || 0) - (stats?.soldWeight || 0)).toFixed(
                  2
                )
              }
              unit="кг"
            />
          </Grid>
          <Grid item xs={2}>
            <StatPlate
              label="Прибуток"
              value={Math.round(
                (stats?.earned || 0) - (stats?.totalPrice || 0)
              )}
              unit="грн"
            />
          </Grid>
        </Grid>
      </HomeContainer>
    </>
  );
};

export default Home;
